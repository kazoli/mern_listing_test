import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/general/hooks';
import { tCollectionQueryParts } from '../../app/collection/collectionTypes';
import { getCollections } from '../../app/collection/collectionThunks';
import {
  buildURL,
  refreshPage,
  resetCollectionState,
  toogleEditor,
  toogleHighlighted,
  updateCollectionQueryParts,
} from '../../app/collection/collectionSlice';
import { FcSearch } from 'react-icons/fc';
import {
  AiOutlineCloseCircle,
  AiOutlineExclamationCircle,
  AiOutlinePlusCircle,
} from 'react-icons/ai';
import UserCheckLoggedIn from '../user/UserCheckLoggedIn';
import DefaultLayout from '../layout/DefaultLayout';
import Paginator from '../general/Paginator';
import CollectionEditorPopup from '../collection/CollectionEditorPopup';
import RefreshButton from '../general/RefreshButton';
import DropDownMenu from '../general/DropDownMenu';
import Collection from '../collection/Collection';

type tSearch = {
  keywords: tCollectionQueryParts['keywords'];
};

const Collections: React.FC = () => {
  UserCheckLoggedIn({
    navigateToLogin: true,
  });

  useEffect(() => {
    // set page title
    document.title = 'Collections';
  }, []);

  const dispatch = useAppDispatch();
  const collections = useAppSelector((state) => state.collections);

  const [search, setSearch] = useState<tSearch>({
    keywords: '',
  });

  useEffect(() => {
    // if page refreshing has triggered then it requests data from backend
    if (collections.refreshPage) {
      // waiting 50 ms for creating query string in URL
      setTimeout(() => dispatch(getCollections(window.location.search)), 50);
    }
  }, [dispatch, collections.refreshPage]);

  useEffect(() => {
    // set highlighted false
    if (collections.highlighted !== false) {
      // this needs to be bigger than effect time
      setTimeout(() => dispatch(toogleHighlighted(false)), 1500);
    }
  }, [dispatch, collections.highlighted]);

  useEffect(() => {
    if (collections.status !== 'loading') {
      if (collections.data === null) {
        if (collections.status === 'idle') {
          // trigger to request first data from backend
          dispatch(refreshPage());
        } else {
          // error occured
          toast.error(collections.message);
          // reset status to idle and remove message
          dispatch(resetCollectionState());
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
        dispatch(resetCollectionState());
        // rebuild url for browser by returned and valid filter values
        dispatch(buildURL());
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
      updateCollectionQueryParts({
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
          updateCollectionQueryParts({
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
        {collections.refreshButton && <RefreshButton action={() => dispatch(refreshPage())} />}
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
            <div className="search-control-block">
              <button
                className="search-submit click"
                onClick={() => {
                  if (search.keywords.length) updateCollectionQuery(search.keywords);
                }}
              >
                <FcSearch className="icon" />
              </button>
            </div>
          </div>
          <div className="action-bar">
            <div>
              <nav>
                <label className="icon-wrapper click" onClick={() => dispatch(toogleEditor(true))}>
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
            </div>
            <div>
              <DropDownMenu
                selected={collections.queryParts.sort}
                options={{
                  '': 'Name (A-Z)',
                  nameDESC: 'Name (Z-A)',
                  createdDESC: 'Recently created at front',
                  createdASC: 'Formerly created at front',
                }}
                selectAction={(value) =>
                  dispatch(
                    updateCollectionQueryParts({
                      queryPart: 'sort',
                      value: value,
                      refreshPage: true,
                    }),
                  )
                }
              />
              <DropDownMenu
                selected={collections.queryParts.limit}
                options={{
                  '': '12 / page',
                  p36: '36 / page',
                  p60: '60 / page',
                }}
                selectAction={(value) =>
                  dispatch(
                    updateCollectionQueryParts({
                      queryPart: 'limit',
                      value: value,
                      refreshPage: true,
                    }),
                  )
                }
              />
            </div>
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
