import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/general/hooks';
import { useCheckLoggedIn } from '../../app/user/userHooks';
import { tButton, tListHeaderActionDropDowns } from '../../app/general/types';
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
import {
  collectionListLimit,
  collectionListSort,
} from '../../app/collection/collectionInitialStates';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import DefaultLayout from '../layout/DefaultLayout';
import Paginator from '../general/Paginator';
import CollectionEditorPopup from '../collection/CollectionEditorPopup';
import ButtonRefresh from '../general/ButtonRefresh';
import ListHeader from '../list/ListHeader';
import Collection from '../collection/Collection';

const CollectionList: React.FC = () => {
  useEffect(() => {
    // set page title
    document.title = 'Collections';
  }, []);

  // check user is logged in
  useCheckLoggedIn(true);

  const dispatch = useAppDispatch();
  const collections = useAppSelector((state) => state.collections);

  const [search, setSearch] = useState({
    keywords: '',
  });

  const updateCollectionQuery = (
    queryPart: keyof tCollectionQueryParts,
    value: string,
    refresh: boolean = true,
  ) => {
    // set redux keywords and request a page refresh
    dispatch(
      collectionUpdateQueryParts({
        queryPart: queryPart,
        value: value,
        refreshPage: refresh,
      }),
    );
  };

  const listHeaderActionButtons: tButton[] = [
    { text: 'Add a new collection', action: () => dispatch(collectionToogleEditor(true)) },
  ];
  if (collections.resetSearch) {
    listHeaderActionButtons.push({
      text: 'Reset search',
      action: () => {
        updateCollectionQuery('keywords', '');
      },
    });
  }

  const listHeaderActionDropDowns: tListHeaderActionDropDowns = [
    {
      triggerText: collectionListSort[collections.queryParts.sort],
      ignoredOption: collections.queryParts.sort,
      options: collectionListSort,
      action: (value) => updateCollectionQuery('sort', value as string),
    },
    {
      triggerText: collectionListLimit[collections.queryParts.limit],
      ignoredOption: collections.queryParts.limit,
      options: collectionListLimit,
      action: (value) => updateCollectionQuery('limit', value as string),
    },
  ];

  useEffect(() => {
    let timerId: NodeJS.Timeout;
    // if page refreshing has been triggered then it requests data from backend
    if (collections.refreshPage) {
      // waits for a while to create query string in URL
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

  const paginator: JSX.Element = (
    <Paginator
      page={collections.queryParts.page}
      isNextPage={collections.isNextPage}
      refreshPage={collections.refreshPage}
      selectAction={(value) => updateCollectionQuery('page', value as string)}
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
          <ButtonRefresh action={() => dispatch(collectionRefreshPage())} />
        )}
        <ListHeader
          search={search}
          setSearch={setSearch}
          action={() => updateCollectionQuery('keywords', search.keywords)}
          listHeaderActionButtons={listHeaderActionButtons}
          listHeaderActionDropDowns={listHeaderActionDropDowns}
        />
        {collections.data && collections.data.length > 0 ? (
          <>
            {paginator}
            <section className="list-container">
              <div className="list-grid">
                {collections.data.map((collection, index) => (
                  <Collection
                    key={collection._id}
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

export default CollectionList;
