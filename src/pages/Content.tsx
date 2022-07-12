import { Anchor, Breadcrumbs, Container, SimpleGrid } from "@mantine/core";
import React from "react";
import { ServiceCard } from "../components/Card/ServiceCard";

export const Content: React.FC = () => {
  const items = [
    { title: "Categories", href: "#" },
    { title: "All", href: "#" },
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));

  return (
    <>
      <Container
        sx={(theme) => ({
          backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : "#FFFFFF",
          minWidth: "90%",
          paddingBottom: "20px",
        })}
      >
        <Breadcrumbs py="sm">{items}</Breadcrumbs>
        <SimpleGrid
          cols={3}
          breakpoints={[
            { maxWidth: 2000, cols: 3, spacing: "xl" },
            { maxWidth: 1700, cols: 2, spacing: "xl" },
            { maxWidth: 1200, cols: 1, spacing: "sm" },
          ]}
          style={{ alignItems: "stretch" }}
        >
          <ServiceCard
            image="https://frisorbarbershop.com/images/b-promo/world/1promo.jpg"
            title="Excalibur barbershop"
            about="We have only professional certified barbers that will make your hair or beard look like never before! We offer free drinks and ..."
            link="excalibur"
            rating={5}
          />
          <ServiceCard
            image="https://yams.kufar.by/api/v1/kufar-ads/images/73/7354651724.jpg?rule=gallery"
            title="Ремонт стиральных машин с выездом на дом"
            about="Ремонт стиральных машин в Минске, Минском районе, Бресте, Гомеле, Гродно!
            "
            link="excalibur"
            rating={3}
          />
          <ServiceCard
            image="https://yams.kufar.by/api/v1/kufar-ads/images/72/7230834867.jpg?rule=gallery"
            title="Ремонт холодильников с выездом на дом и гарантией
            "
            about="Ремонт холодильников в Минске и Минском районе, Гродно, Гомеле, Бресте.
            "
            link="excalibur"
            rating={2}
          />
          <ServiceCard
            image="https://yams.kufar.by/api/v1/kufar-ads/images/76/7674430260.jpg?rule=gallery"
            title="Репетитор немецкий язык
            "
            about="Меня зовут Елена, я студентка 4-го курса академии Управления!
            Неоднократно была в Германии, участвую в олимпиадах и пишу научные работы!
            Свободно общаюсь на немецком языке."
            link="excalibur"
            rating={5}
          />
          <ServiceCard
            image="https://yams.kufar.by/api/v1/kufar-ads/images/77/7703632455.jpg?rule=gallery"
            title="РЕМОНТ ВАРОЧНЫХ ПАНЕЛЕЙ НА ДОМУ В МИНСКЕ
            "
            about="Ремонтируем электрические и индукционные варочные панели в Минске.
            "
            link="excalibur"
            rating={4}
          />
          <ServiceCard
            image="https://yams.kufar.by/api/v1/kufar-ads/images/32/3269589570.jpg?rule=gallery"
            title="РЕМОНТ ТЕЛЕВИЗОРОВ С ВЫЕЗДОМ НА ДОМ В МИНСКЕ
            "
            about="Выполняем ремонт и настройку телевизоров любых брендов в Минске.
            "
            link="excalibur"
            rating={4}
          />
        </SimpleGrid>
      </Container>
    </>
  );
};
