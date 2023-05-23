import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/general/hooks';
import { useCheckLoggedIn } from '../../app/user/userHooks';
import { tCollectionQueryParts } from '../../app/collection/collectionTypes';
import { getCollections } from '../../app/collection/collectionThunks';
import {
  collectionBuildURL,
  collectionRefreshPage,
  collectionResetState,
  collectionToogleEditor,
  collectionToogleHighlighted,
  collectionUpdateQueryParts,
} from '../../app/collection/collectionSlice';
import { FcSearch } from 'react-icons/fc';
import {
  AiOutlineCloseCircle,
  AiOutlineExclamationCircle,
  AiOutlinePlusCircle,
  AiOutlineRightCircle,
} from 'react-icons/ai';
import DefaultLayout from '../layout/DefaultLayout';
import Paginator from '../general/Paginator';
import CollectionEditorPopup from '../collection/CollectionEditorPopup';
import RefreshButton from '../general/RefreshButton';
import Collection from '../collection/Collection';
import {
  collectionListLimit,
  collectionListSort,
} from '../../app/collection/collectionInitialStates';
import DropDownMenu from '../general/DropDownMenu';
import DropDownListLabel from '../general/DropDownListLabel';

type tSearch = {
  keywords: tCollectionQueryParts['keywords'];
};

const Collections: React.FC = () => {
  useEffect(() => {
    // set page title
    document.title = 'Collections';
  }, []);

  // check user is logged in
  // useCheckLoggedIn(true);

  const dispatch = useAppDispatch();
  const collections = useAppSelector((state) => state.collections);

  const [search, setSearch] = useState<tSearch>({
    keywords: '',
  });

  useEffect(() => {
    let timerId: NodeJS.Timeout;
    // if page refreshing has triggered then it requests data from backend
    if (collections.refreshPage) {
      // waiting 50 ms for creating query string in URL
      timerId = setTimeout(() => dispatch(getCollections(window.location.search)), 150);
    }
    // if redirect occurs because of JWT missing, then cancel dispatch
    return () => clearTimeout(timerId);
  }, [dispatch, collections.refreshPage]);

  useEffect(() => {
    // set highlighted false
    if (collections.highlighted !== false) {
      // this needs to be bigger than effect time
      setTimeout(() => dispatch(collectionToogleHighlighted(false)), 1500);
    }
  }, [dispatch, collections.highlighted]);

  useEffect(() => {
    if (collections.status !== 'loading') {
      if (collections.data === null) {
        if (collections.status === 'idle') {
          // trigger to request first data from backend
          dispatch(collectionRefreshPage());
        } else {
          // error occured
          toast.error(collections.message);
          // reset status to idle and remove message
          dispatch(collectionResetState());
        }
      } else {
        if (collections.message !== '') {
          switch (collections.status) {
            case 'failed':
              // server returns error
              toast.error(collections.message);
              break;
            case 'warning':
              // server returns success but with a message
              toast.warn(collections.message, { toastId: 'warn' });
              break;
            case 'idle':
              // server returns success, message comes from reducers
              toast.success(collections.message, { toastId: 'success' });
              break;
          }
        }
        // reset status to idle and remove message
        dispatch(collectionResetState());
        // rebuild url for browser by returned and valid filter values
        dispatch(collectionBuildURL());
        // update search fields with response data
        setSearch({
          keywords: collections.queryParts.keywords,
        });
      }
    }
  }, [dispatch, collections.data, collections.queryParts, collections.status, collections.message]);

  const updateCollectionQuery = (keywords: tSearch['keywords']) => {
    // set redux keywords and request a page refresh
    dispatch(
      collectionUpdateQueryParts({
        queryPart: 'keywords',
        value: keywords,
        refreshPage: true,
      }),
    );
  };

  const paginator: JSX.Element = (
    <Paginator
      page={collections.queryParts.page}
      isNextPage={collections.isNextPage}
      refreshPage={collections.refreshPage}
      selectAction={(value) =>
        dispatch(
          collectionUpdateQueryParts({
            queryPart: 'page',
            value: value,
            refreshPage: true,
          }),
        )
      }
    />
  );

  return (
    <DefaultLayout loading={collections.status === 'loading'}>
      <>
        {collections.editor !== false && (
          <CollectionEditorPopup
            collection={
              !collections.data || collections.editor === true
                ? false
                : collections.data[collections.editor]
            }
          />
        )}
        {collections.refreshButton && (
          <RefreshButton action={() => dispatch(collectionRefreshPage())} />
        )}
        <section className="filter-wrapper">
          <div className="search-bar">
            <input
              className="search-input"
              type="text"
              placeholder="Enter keywords"
              onChange={(e) =>
                setSearch({
                  ...search,
                  keywords: e.target.value,
                })
              }
              value={search.keywords}
            />
            <FcSearch
              className="icon-wrapper click"
              onClick={() => search.keywords.length && updateCollectionQuery(search.keywords)}
            />
          </div>
          <div className="action-bar">
            <section>
              <nav>
                <label
                  className="icon-wrapper click"
                  onClick={() => dispatch(collectionToogleEditor(true))}
                >
                  <AiOutlinePlusCircle className="icon" />
                  <span>Add a new collection</span>
                </label>
              </nav>
              {collections.resetSearch && (
                <nav>
                  <label className="icon-wrapper click" onClick={() => updateCollectionQuery('')}>
                    <AiOutlineCloseCircle className="icon" />
                    <span>Reset search</span>
                  </label>
                </nav>
              )}
            </section>
            <section>
              <DropDownMenu
                wrapperClass="list-drop-down-wrapper"
                listClass="list-drop-down-menu"
                optionClass="icon-wrapper click"
                trigger={
                  <DropDownListLabel text={collectionListSort[collections.queryParts.sort]} />
                }
                ignoredOption={collections.queryParts.sort}
                options={collectionListSort}
                action={(value) =>
                  dispatch(
                    collectionUpdateQueryParts({
                      queryPart: 'sort',
                      value: value,
                      refreshPage: true,
                    }),
                  )
                }
                optionIcon={<AiOutlineRightCircle className="icon" />}
              />
              <DropDownMenu
                wrapperClass="list-drop-down-wrapper"
                listClass="list-drop-down-menu"
                optionClass="icon-wrapper click"
                trigger={
                  <DropDownListLabel text={collectionListLimit[collections.queryParts.limit]} />
                }
                ignoredOption={collections.queryParts.limit}
                options={collectionListLimit}
                action={(value) =>
                  dispatch(
                    collectionUpdateQueryParts({
                      queryPart: 'limit',
                      value: value,
                      refreshPage: true,
                    }),
                  )
                }
                optionIcon={<AiOutlineRightCircle className="icon" />}
              />
            </section>
          </div>
        </section>
        {collections.data && collections.data.length > 0 ? (
          <>
            {paginator}
            <section className="list-container">
              <div className="list-grid">
                {collections.data?.map((collection, index) => (
                  <Collection
                    key={index}
                    index={index}
                    collection={collection}
                    highlighted={collections.highlighted}
                  />
                ))}
              </div>
            </section>
            {paginator}
          </>
        ) : (
          <section className="list-empty-container">
            <AiOutlineExclamationCircle className="icon" />
            <span>No collection found</span>
          </section>
        )}
      </>
    </DefaultLayout>
  );
};

export default Collections;
