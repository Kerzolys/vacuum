import styles from "./laboratory-terms-and-conditions.module.scss";

export const LaboratoryTermsAndConditions = () => {
  return (
    <div className={styles.container}>
      <ul>
        <li>
          <h3>Сроки подачи заявок</h3>
          <ul>
            <li>
              <p>для композиторов: с 1 по 20 августа</p>
            </li>
            <li>
              <p>для струнных квартетов: с 1 августа по 1 сентября</p>
            </li>
          </ul>
        </li>
        <li>
          <h3>Кто может подать заявку:</h3>
          <ul>
            <li>
              <p>
                Композиторы, заинтересованные в создании нового сочинения для
                струнного квартета с электроникой и/или мультимедиа;
              </p>
            </li>
            <li>
              <p>
                Струнные квартеты, желающие на практике изучить особенности
                работы над современными партитурами, в том числе с электроникой
                и мультимедиа.
              </p>
            </li>
          </ul>
        </li>
        <li>
          <h3>Место и сроки проведения:</h3>
          <ul>
            <li>
              <p>Москва, Московская консерватория им. П.И. Чайковского</p>
            </li>
            <li>
              <p>Лекции: 20–25 сентября</p>
            </li>
            <li>
              <p>
                Работа с педагогами, ансамблем и звукоинженерами: 1–28 октября
              </p>
            </li>
            <li>
              <p>Финальный концерт: 30 октября, Арт-пространство Артемьев</p>
            </li>
          </ul>
        </li>
        <li>
          <h3>Этапы лаборатории (для композиторов):</h3>
          <ul>
            <li>
              <p>презентации идей новых электроакустических композиций*</p>
            </li>
            <li>
              <p>посещение лекций приглашенных преподавателей</p>
            </li>
            <li>
              <p>разработка и обсуждение концепций сочинений с педагогами</p>
            </li>
            <li>
              <p>индивидуальная работа с квартетом и звукоинженерами</p>
            </li>
            <li>
              <p>репетиции и исполнение на финальном концерте</p>
            </li>
          </ul>
          <span>*Длительность сочинения должна составлять 7-15 минут.</span>
        </li>
        <li>
          <h3>Этапы лаборатории (для квартетов):</h3>
          <ul>
            <li>
              <p>
                Не менее 4 занятий — изучение акустических квартетов** с
                педагогами лаборатории.
              </p>
            </li>
            <li>
              <p>
                Не менее 4 занятий — изучение новых электроакустических
                сочинений*, написанных композиторами-участниками лаборатории.
              </p>
            </li>
            <li>
              <p>
                Не менее 3 занятий — работа над электроакустическим октетом* с
                инженерами ЦЭАМ и педагогами.
              </p>
            </li>
          </ul>
          <p>
            **Программа финального концерта для отобранных исполнителей будет
            включать 2 акустических квартета, 2 электроакустических квартета,
            написанных авторами, отобранными для участия в лаборатории, и одного
            мультимедийного октета.
          </p>
        </li>
      </ul>
      <p>
        Участники будут выбраны на конкурсной основе преподавателями, кураторами
        проекта и участниками квартета Vacuum. По итогам отбора к участию будут
        приглашены 2 композитора и 2 струнных квартета.{" "}
      </p>
      <p>
        Все занятия лаборатории пройдут в очной форме в Москве, участие в
        лаборатории для отобранных музыкантов — бесплатны. Проезд до Москвы и
        проживание не компенсируются и осуществляются участниками за свой счёт.
      </p>
    </div>
  );
};
