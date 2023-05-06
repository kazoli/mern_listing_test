import { useEffect, useState } from "react";
import { AiOutlineUpCircle } from "react-icons/ai";

const JumpTop: React.FC = () => {
  const [jumpTop, setJumpTop] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => setJumpTop(window.scrollY > 200));
  }, []);

  return (
    <>
      {jumpTop && (
        <AiOutlineUpCircle
          className="jump-top"
          title="Jump top"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
        />
      )}
    </>
  );
};

export default JumpTop;
