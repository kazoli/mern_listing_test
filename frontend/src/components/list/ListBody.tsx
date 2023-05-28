type tProps = {
  paginator: JSX.Element;
  children: JSX.Element[];
};

const ListBody: React.FC<tProps> = (props) => {
  return (
    <>
      {props.paginator}
      <section className="list-container">
        <div className="list-grid">{props.children}</div>
      </section>
      {props.paginator}
    </>
  );
};

export default ListBody;
