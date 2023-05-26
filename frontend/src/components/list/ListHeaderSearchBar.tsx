import { tObject } from '../../app/general/types';
import { FcSearch } from 'react-icons/fc';

type tProps<T> = {
  search: T;
  setSearch: React.Dispatch<React.SetStateAction<T>>;
  action: () => void;
  searchType?: JSX.Element;
};

const ListHeaderSearchBar = <T extends tObject>(props: tProps<T>) => {
  return (
    <div className="list-header-search-bar">
      <input
        className="list-header-search-input"
        type="text"
        placeholder="Enter keywords"
        onChange={(e) =>
          props.setSearch({
            ...props.search,
            keywords: e.target.value,
          })
        }
        value={props.search.keywords}
      />
      <div className="list-header-search-block">
        {props.searchType}
        <div
          className="icon-wrapper click"
          onClick={() => props.search.keywords.length && props.action()}
        >
          <FcSearch className="icon uncolored" />
        </div>
      </div>
    </div>
  );
};

export default ListHeaderSearchBar;
