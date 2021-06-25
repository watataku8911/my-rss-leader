import styles from "./Card.module.css";

type Props = {
  link: string;
  title: string;
  description: string;
};

const Card = (props: Props) => {
  const path: string = window.location.pathname;
  let imagePath: string = "";
  let alt: string = "";
  switch (path) {
    case "/":
      imagePath = "./images/logo-only-dark.png";
      alt = "zennのロゴ";
      break;
    case "/qiita":
      imagePath = "./images/qiita.jpeg";
      alt = "qiitaのロゴ";
      break;
    case "/ics-media":
      imagePath = "./images/ics-media.jpeg";
      alt = "ics-mediaのロゴ";
      break;
    case "/cookpad":
      imagePath = "./images/cookpad.jpeg";
      alt = "cookpadのロゴ";
      break;
  }

  return (
    <>
      <a href={props.link} target="_blank" className={styles.href}>
        <div className={styles.card}>
          <div className={styles.image_box}>
            <img src={imagePath} alt={alt} />
          </div>
          <div className={styles.description}>
            <h3 className={styles.title}>{props.title}</h3>
            <p className={styles.text}>{props.description}</p>
          </div>
        </div>
      </a>
    </>
  );
};

export default Card;
