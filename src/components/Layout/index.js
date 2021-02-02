import s from "./Layout.module.css";

const Layout = ({ id, title, urlBackground, colorBackground, children }) => {
  const style = {};
  if (urlBackground) {
    style.backgroundImage = `url(${urlBackground})`;
  }
  if (colorBackground) {
    style.backgroundColor = colorBackground;
  }
  return (
    <section className={s.root} id={id} style={style}>
      <div className={s.wrapper}>
        <article>
          {title && (
            <div className={s.title}>
              <h3>{title}</h3>
              <span className={s.separator}></span>
            </div>
          )}
          {children && (
            <div className={`${s.desc} ${s.full}`}>
              {children}
            </div>
          )}
        </article>
      </div>
    </section>
  );
};

export default Layout;
