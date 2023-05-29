import { NavLink } from 'react-router-dom';
import { tCollectionData, tCollectionState } from '../../app/collection/collectionTypes';
import { useAppDispatch } from '../../app/general/hooks';
import { collectionToogleEditor } from '../../app/collection/collectionSlice';
import { deleteCollection } from '../../app/collection/collectionThunks';
import { formatDate } from '../../app/general/middlewares';
import { AiOutlineDelete, AiOutlineEdit, AiOutlineRightCircle } from 'react-icons/ai';

type tProps = {
  index: number;
  collection: tCollectionData;
  highlighted: tCollectionState['highlighted'];
};

const CollectionListElement: React.FC<tProps> = (props) => {
  const dispatch = useAppDispatch();

  return (
    <div
      className={
        props.highlighted === props.collection._id ? 'list-wrapper highlighted' : 'list-wrapper'
      }
    >
      <div className="list-element-top-wrapper">
        <div className="list-element-title">{props.collection.name}</div>
        <div className="list-element-feature-wrapper">
          <p>
            <label>Created</label>
            <span>{formatDate(props.collection.createdAt)}</span>
          </p>
          <p>
            <label>Updated</label>
            <span>{formatDate(props.collection.updatedAt)}</span>
          </p>
        </div>
        <NavLink
          to={`/tasks/${props.collection._id}`}
          reloadDocument
          className="list-element icon-wrapper click"
        >
          <AiOutlineRightCircle className="icon" />
          <span>Go to tasks</span>
        </NavLink>
      </div>
      <div className="list-element-icon-wrapper">
        <AiOutlineEdit
          className="icon click"
          title="Edit collection"
          onClick={() => dispatch(collectionToogleEditor(props.index))}
        />
        <AiOutlineDelete
          className="icon click"
          title="Delete collection"
          onClick={() => dispatch(deleteCollection(props.collection._id))}
        />
      </div>
    </div>
  );
};

export default CollectionListElement;
