import { SectionLineUI } from "../ui/section-line-ui/section-line-ui";
import vacuumCeamImg from "../../assets/lab/2J9A5330.webp";

import styles from "./laboratory-info.module.scss";
import { partners } from "../../utils/partnersInfo";
import { PartnerAccordeon } from "../ui/partner-accordion/partner-accordion";
import { lectors } from "../../utils/lectorsInfo";
import { LectorBlockUI } from "../ui/lector-block-ui/lector-block-ui";
import { composerResults, quartetResults } from "../../utils/results";
import { WinnerBlockUI } from "../ui/winner-block-ui/winner-block-ui";

export const LaboratoryInfo = () => {
  return (
    <div className={styles.container}>
      <div className={styles.container__content}>
        <div className={styles.container__final}>
          <h3>Заключительный концерт Vacuum Quartet Lab</h3>
          <h3>30 октября | 20:00</h3>
          <h3>Арт-центр "Артемьев"</h3>
          <div className={styles.container__final__piece}>
            <p>
              <strong>Евгения Аберемко </strong>{" "}
              <span title="“Из-за стены” - иммерсивная звуковая драма, где слушатель становится случайным свидетелем событий, героев и контекста которых он не знает. Как бы находясь у себя дома, он не видит, а только слышит разворачивающуюся за его стеной глубоко личную историю, рассказанную бытовыми звуками, шумом и отзвуками голосов, доносящихся оттуда. Средствами струнного квартета и электроники создается невидимое и почти театральное действие, где ведущую роль играет воображение слушателя.">
                {" "}
                «Из-за стены» для струнного квартета и электроники 
              </span>{" "}
              — мировая премьера 
            </p>
          </div>
          <div className={styles.container__final__piece}>
            <p>
              <strong>Станислав Фролов </strong>{" "}
              <span
                title="Утро, когда ты выбрал разубить себя. За окном дождь капает солнечными нитями, они слегка прожигают кожу, если попадают на нее. «Смотри […] —
звук тонет медленнее, чем тело.» Четыре тела — расщепление на четыре медиума.  Четыре по-китайски — сы, созвучное сы смерти, разница лишь в тоне. За-тон-увший отекший мир, а я не отекаю обычно. Срезы мыслей утопают под солнечным ливнем, заполняющим улыбающиеся седьмые врата плоти. Был сон? Тень расплывается предо мной. Густо. Я следую за ней, перепрыгивая.
Перешагивая. Мечтаюши. Доброе утро. 

Проект сопроживания для струнного квартета, электроники и видео. Продолжение «оды тоске и чувственности» в формате «консервированной скуки, требующей живой плоти»."
              >
                {" "}
                "the morning after I unkilled myself — ennui"{" "}
              </span>
              — мировая премьера 
            </p>
          </div>
          <div className={styles.container__final__piece}>
            <p>
              <strong>Георг Фридрих Хаас</strong> Струнный квартет №2 
            </p>
          </div>
          <div className={styles.container__final__piece}>
            <p>
              <strong>Жерар Пессон</strong> Струнный квартет № 2 "Bitume"
            </p>
          </div>
          <div className={styles.container__final__piece}>
            <p>
              <strong>Дэвид Бёрд</strong> "drop" для струнного октета и света 
            </p>
          </div>
          <ul>
            <p>Исполнители:</p>
            <li>
              <p>София Барканова (скрипка)</p>
            </li>
            <li>
              <p>Анастасия Фатхудинова (скрипка)</p>
            </li>
            <li>
              <p>Алиса Гражевская (скрипка)</p>
            </li>
            <li>
              <p>Елена Перерва (скрипка)</p>
            </li>
            <li>
              <p>Григорий Ковалев (альт)</p>
            </li>
            <li>
              <p>Олеся Бухараева (альт)</p>
            </li>
            <li>
              <p>Анна Адамян (виолончель)</p>
            </li>
            <li>
              <p>Юлиана Лукьянова (виолончель)</p>
            </li>
            <li>
              <p>Илья Ковальский (электроника)</p>
            </li>
            <li>
              <p>Ильнур Габидуллин (звукорежиссер)</p>
            </li>
            <li>
              <p>Игорь Павлов (свет)</p>
            </li>
            <li>
              <p>Александр Бедин (видео)</p>
            </li>
            <li>
              <p>Александр Петтай (трансляция)</p>
            </li>
            <li>
              <p>Павел Сурков (звукоинженер)</p>
            </li>
          </ul>
        </div>
        <SectionLineUI />

        <h3>
          Результаты приёма заявок на участие в лаборатории для композиторов и
          струнных квартетов — Vacuum Quartet Lab.
        </h3>
        <SectionLineUI />
        <div className={styles.container__results}>
          <div className={styles.container__results__composers}>
            {composerResults.map((c) => (
              <WinnerBlockUI data={c} key={c.id} />
            ))}
          </div>
          <div className={styles.container__results__quartets}>
            {quartetResults.map((q) => (
              <WinnerBlockUI data={q} key={q.id} />
            ))}
          </div>
          <div>
            <p className={styles.container__results__text}>
              Благодарим всех, кто подал заявку на опен-колл лаборатории! Мы
              невероятно рады большому интересу к нашему проекту, вдохновлены
              возможностью поделиться своими знаниями с молодыми музыкантами и с
              нетерпением ждем начала совместных творческих экспериментов!
            </p>
            <p className={styles.container__results__text}>
              Приглашаем всех посещать лекции и концерты Vacuum Quartet Lab в
              арт-пространстве «Артемьев». Расписание будет опубликовано на
              сайте и в соцсетях в ближайшее время.
            </p>
            <p className={styles.container__results__text}>
              Отобранные композиторы будут сочинять под руководством тьюторов, а
              в воплощении их нестандартных творческих замыслов им помогут
              инженеры Центра электроакустической музыки (ЦЭАМ). Струнные
              квартеты получат уникальный опыт работы с новыми сочинениями: на
              финальном концерте они исполнят акустические пьесы и мировые
              премьеры композиторов-участников.
            </p>
            <p className={styles.container__results__text}>
              Заключительный концерт лаборатории станет частью фестиваля Gnesin
              Contemporary Music Week.
            </p>
          </div>
        </div>
        <SectionLineUI />
        <p>
          Совместный проект струнного квартета Vacuum, Центра
          электроакустической музыки (ЦЭАМ) и фестиваля Gnesin Contemporary
          Music Week
        </p>
        <div className={styles.container__info}>
          <div>
            <p>
              Vacuum Quartet Lab — это интенсивная образовательная программа,
              посвящённая углублённому изучению принципов квартетного ансамбля,
              современной нотации, основ электроакустической и мультимедийной
              композиции, а также практическому взаимодействию композиторов и
              исполнителей с преподавателями и звукоинженерами.
            </p>
            <p>
              В период с 20 сентября по 30 октября участников ждут
              индивидуальные и групповые занятия, лекции, работа в студии Центра
              электроакустической музыки Московской консерватории (ЦЭАМ),
              создание нового сочинения и участие в финальном концерте на
              фестивале Gnesin Contemporary Music Week.
            </p>
          </div>
          <img src={vacuumCeamImg} alt="Vacuum Quartet & Biomechanics" />
        </div>
        <SectionLineUI isForward={false} />
        <div className={styles.container__partners}>
          <h3>Партнеры проекта</h3>
          <div className={styles.container__partners__partners}>
            {partners.map((p) => (
              <PartnerAccordeon data={p} key={p.id} />
            ))}
          </div>
        </div>
        <SectionLineUI />
        <div className={styles.container__lectors}>
          <h3>Педагоги и кураторы</h3>
          <div className={styles.container__lectors__lectors}>
            {lectors.map((l) => (
              <LectorBlockUI data={l} key={l.id} />
            ))}
          </div>
        </div>
        <SectionLineUI isForward={false} />
      </div>
    </div>
  );
};
