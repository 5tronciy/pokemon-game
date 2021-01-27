import s from "./Layout.module.css";

const Layout = ({ id, title, description, urlBackground, colorBackground }) => {
  const styleRoot = urlBackground
    ? { backgroundImage: `url(${urlBackground})` }
    : colorBackground
    ? { backgroundColor: colorBackground }
    : {};
  return (
    <section className={s.root} id={id} style={styleRoot}>
      <div className={s.wrapper}>
        <article>
          {title && (
            <div className={s.title}>
              <h3>{title}</h3>
              <span className={s.separator}></span>
            </div>
          )}
          {description && (
            <div className={`${s.desc} ${s.full}`}>
              <p>{description}</p>
            </div>
          )}
        </article>
      </div>
    </section>
  );
};

export default Layout;
