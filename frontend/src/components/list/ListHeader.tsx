import { tButton, tListHeaderActionDropDowns, tObject } from '../../app/general/types';
import ListHeaderActionBar from './ListHeaderActionBar';
import ListHeaderSearchBar from './ListHeaderSearchBar';

type tProps<T> = {
  search: T;
  setSearch: React.Dispatch<React.SetStateAction<T>>;
  action: () => void;
  searchType?: JSX.Element;
  listHeaderActionButtons: tButton[];
  listHeaderActionDropDowns: tListHeaderActionDropDowns;
};

const ListHeader = <T extends tObject>(props: tProps<T>) => {
  return (
    <section className="list-header">
      <ListHeaderSearchBar
        search={props.search}
        setSearch={props.setSearch}
        action={props.action}
        searchType={props.searchType}
      />
      <ListHeaderActionBar
        buttons={props.listHeaderActionButtons}
        dropDowns={props.listHeaderActionDropDowns}
      />
    </section>
  );
};

export default ListHeader;
