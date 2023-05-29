import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/general/hooks';
import { useCheckLoggedIn } from '../../app/user/userHooks';
import { tButton, tListHeaderActionDropDowns } from '../../app/general/types';
import { tCollectionQueryParts } from '../../app/collection/collectionTypes';
import { getCollections } from '../../app/collection/collectionThunks';
import {
  collectionBuildURL,
  collectionRefreshPage,
  collectionToogleEditor,
  collectionToogleHighlighted,
  collectionUpdateQueryParts,
} from '../../app/collection/collectionSlice';
import {
  collectionInitialState,
  collectionListLimit,
  collectionListSort,
} from '../../app/collection/collectionInitialStates';
import DefaultLayout from '../layout/DefaultLayout';
import Paginator from '../general/Paginator';
import CollectionEditorPopup from '../collection/CollectionEditorPopup';
import ButtonRefresh from '../general/ButtonRefresh';
import ListHeader from '../list/ListHeader';
import ListBody from '../list/ListBody';
import ListBodyEmpty from '../list/ListBodyEmpty';
import CollectionListElement from '../collection/CollectionListElement';

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
    keywords: collectionInitialState.queryParts.keywords,
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
        updateCollectionQuery('keywords', collectionInitialState.queryParts.keywords);
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
    // cease highlighting of element
    if (collections.highlighted !== false) {
      setTimeout(() => dispatch(collectionToogleHighlighted(false)), 1500);
    }
  }, [dispatch, collections.highlighted]);

  useEffect(() => {
    if (collections.status !== 'loading') {
      if (collections.data === null) {
        // trigger to request first data from backend
        dispatch(collectionRefreshPage());
      } else {
        // rebuild url for browser by returned and valid filter values
        dispatch(collectionBuildURL());
        // update search fields with response data
        setSearch({
          keywords: collections.queryParts.keywords,
        });
      }
    }
  }, [dispatch, collections.data, collections.queryParts, collections.status]);

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
        {collections.data && collections.data.length ? (
          <ListBody
            paginator={
              <Paginator
                page={collections.queryParts.page}
                isNextPage={collections.isNextPage}
                refreshPage={collections.refreshPage}
                selectAction={(value) => updateCollectionQuery('page', value as string)}
              />
            }
            children={collections.data.map((collection, index) => (
              <CollectionListElement
                key={collection._id}
                index={index}
                collection={collection}
                highlighted={collections.highlighted}
              />
            ))}
          />
        ) : (
          <ListBodyEmpty text="No collection found" />
        )}
      </>
    </DefaultLayout>
  );
};

export default CollectionList;
