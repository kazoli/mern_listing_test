import { NavLink } from 'react-router-dom';
import { useAppDispatch } from '../../app/general/hooks';
import { tCustomConfirm } from '../../app/general/types';
import { tCollectionData, tCollectionState } from '../../app/collection/collectionTypes';
import { deleteCollection } from '../../app/collection/collectionThunks';
import { collectionToogleEditor } from '../../app/collection/collectionSlice';
import { formatDate } from '../../app/general/middlewares';
import { AiOutlineDelete, AiOutlineEdit, AiOutlineRightCircle } from 'react-icons/ai';

type tProps = {
  index: number;
  collection: tCollectionData;
  highlighted: tCollectionState['highlighted'];
  setDeleteConfirm: React.Dispatch<React.SetStateAction<tCustomConfirm | undefined>>;
};

const CollectionListElement: React.FC<tProps> = (props) => {
  const dispatch = useAppDispatch();
  const deleteConfirm = {
    text: `By deletion of "${props.collection.name}" collection, all of related tasks will also be deleted. Are you sure to contine?`,
    continueAction: () => {
      props.setDeleteConfirm(undefined);
      dispatch(deleteCollection(props.collection._id));
    },
    cancelAction: () => props.setDeleteConfirm(undefined),
  };

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
          onClick={() => props.setDeleteConfirm(deleteConfirm)}
        />
      </div>
    </div>
  );
};

export default CollectionListElement;
