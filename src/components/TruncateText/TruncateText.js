import classNames from "classnames";
import styles from "./TruncateText.module.css";

const TruncateText = ({text, maxLine, textStyle, hideTitle, maxWidth}) => {
  return (
    <>
      {(
        <>
          <span
            style={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: maxLine || 1,
              overflow: "hidden",
              maxWidth: maxWidth,
            }}
            title={!hideTitle && text ? text : null}
            className={classNames(styles.spanFont, textStyle)}
          >
            <span>{text}</span>
          </span>
        </>
      )}
    </>
  );
}
TruncateText.defaultProps = {
  maxLine: 1,
  maxWidth: "100px",
  text: "",
  hideTitle: false,
}
export default TruncateText;
