import { tObject } from '../../app/general/types';
import { FcSearch } from 'react-icons/fc';
import FromInputElement from '../form/FromInputElement';
import ButtonIcon from '../general/ButtonIcon';

type tProps<T> = {
  search: T;
  setSearch: React.Dispatch<React.SetStateAction<T>>;
  action: () => void;
  searchType?: JSX.Element;
};

const ListHeaderSearchBar = <T extends tObject>(props: tProps<T>) => {
  return (
    <div className="list-header-search-bar">
      <FromInputElement
        type="text"
        value={props.search.keywords}
        action={(value) =>
          props.setSearch((prevState) => ({
            ...prevState,
            keywords: value,
          }))
        }
        placeholder="Enter keywords"
      />
      <div className="list-header-search-block">
        {props.searchType}
        <ButtonIcon
          action={() => props.search.keywords.length && props.action()}
          icon={<FcSearch className="icon uncolored" />}
        />
      </div>
    </div>
  );
};

export default ListHeaderSearchBar;
