import { AiOutlineDelete, AiOutlineEdit, AiOutlineRightCircle } from 'react-icons/ai';
import { useAppDispatch } from '../../app/general/hooks';
import { tCollectionData, tCollectionState } from '../../app/collection/collectionTypes';
import { toogleEditor } from '../../app/collection/collectionSlice';
import { deleteCollection } from '../../app/collection/collectionThunks';

type tProps = {
  index: number;
  collection: tCollectionData;
  highlighted: tCollectionState['highlighted'];
};

const Collection: React.FC<tProps> = ({ index, collection, highlighted }) => {
  const dispatch = useAppDispatch();

  return (
    <div className={highlighted === collection._id ? 'list-wrapper highlighted' : 'list-wrapper'}>
      <div className="list-element-top-part">
        <div className="list-element-title">{collection.name}</div>
        <div className="list-element-feature-wrapper">
          <p>
            <label>Created</label>
            <span>
              {new Date(collection.createdAt).toLocaleDateString('en-gb', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
              })}
            </span>
          </p>
          <p>
            <label>Updated</label>
            <span>
              {new Date(collection.updatedAt).toLocaleDateString('en-gb', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
              })}
            </span>
          </p>
        </div>
        <a className="list-element icon-wrapper click" href={`/tasks/${collection._id}`}>
          <AiOutlineRightCircle className="icon" />
          <span>Go to tasks</span>
        </a>
      </div>
      <div className="list-element-icon-wrapper">
        <AiOutlineEdit
          className="icon click"
          title="Edit collection"
          onClick={() => dispatch(toogleEditor(index))}
        />
        <AiOutlineDelete
          className="icon click"
          title="Delete collection"
          onClick={() => dispatch(deleteCollection(collection._id))}
        />
      </div>
    </div>
  );
};

export default Collection;