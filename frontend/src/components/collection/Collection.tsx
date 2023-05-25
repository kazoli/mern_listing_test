import { AiOutlineDelete, AiOutlineEdit, AiOutlineRightCircle } from 'react-icons/ai';
import { useAppDispatch } from '../../app/general/hooks';
import { tCollectionData, tCollectionState } from '../../app/collection/collectionTypes';
import { collectionToogleEditor } from '../../app/collection/collectionSlice';
import { deleteCollection } from '../../app/collection/collectionThunks';
import { formatDate } from '../../app/general/middlewares';

type tProps = {
  index: number;
  collection: tCollectionData;
  highlighted: tCollectionState['highlighted'];
};

const Collection: React.FC<tProps> = (props) => {
  const dispatch = useAppDispatch();

  return (
    <div
      className={
        props.highlighted === props.collection._id ? 'list-wrapper highlighted' : 'list-wrapper'
      }
    >
      <div className="list-element-top-part">
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
        <a className="list-element icon-wrapper click" href={`/tasks/${props.collection._id}`}>
          <AiOutlineRightCircle className="icon" />
          <span>Go to tasks</span>
        </a>
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

export default Collection;
