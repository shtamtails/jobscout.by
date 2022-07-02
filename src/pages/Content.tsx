import {
  Anchor,
  Badge,
  Breadcrumbs,
  Button,
  Card,
  Container,
  Group,
  Image,
  Text,
  Title,
} from "@mantine/core";
import React from "react";
import { Star } from "tabler-icons-react";
import { ServiceCard } from "../components/ServiceCard";

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
        })}
      >
        <Breadcrumbs py="sm">{items}</Breadcrumbs>

        <div className="services-content">
          <ServiceCard
            image="https://frisorbarbershop.com/images/b-promo/world/1promo.jpg"
            title="Excalibur barbershop"
            about="We have only professional certified barbers that will make your hair or beard look like never before! We offer free drinks and ..."
            link="excalibur"
            rating={5}
          />
          <ServiceCard
            image="https://frisorbarbershop.com/images/b-promo/world/1promo.jpg"
            title="Excalibur barbershop"
            about="We have only professional certified barbers that will make your hair or beard look like never before! We offer free drinks and ..."
            link="excalibur"
            rating={5}
          />
          <ServiceCard
            image="https://frisorbarbershop.com/images/b-promo/world/1promo.jpg"
            title="Excalibur barbershop"
            about="We have only professional certified barbers that will make your hair or beard look like never before! We offer free drinks and ..."
            link="excalibur"
            rating={5}
          />
          <ServiceCard
            image="https://frisorbarbershop.com/images/b-promo/world/1promo.jpg"
            title="Excalibur barbershop"
            about="We have only professional certified barbers that will make your hair or beard look like never before! We offer free drinks and ..."
            link="excalibur"
            rating={5}
          />
          <ServiceCard
            image="https://frisorbarbershop.com/images/b-promo/world/1promo.jpg"
            title="Excalibur barbershop"
            about="We have only professional certified barbers that will make your hair or beard look like never before! We offer free drinks and ..."
            link="excalibur"
            rating={5}
          />
          <ServiceCard
            image="https://frisorbarbershop.com/images/b-promo/world/1promo.jpg"
            title="Excalibur barbershop"
            about="We have only professional certified barbers that will make your hair or beard look like never before! We offer free drinks and ..."
            link="excalibur"
            rating={5}
          />
          <ServiceCard
            image="https://frisorbarbershop.com/images/b-promo/world/1promo.jpg"
            title="Excalibur barbershop"
            about="We have only professional certified barbers that will make your hair or beard look like never before! We offer free drinks and ..."
            link="excalibur"
            rating={5}
          />
          <ServiceCard
            image="https://frisorbarbershop.com/images/b-promo/world/1promo.jpg"
            title="Excalibur barbershop"
            about="We have only professional certified barbers that will make your hair or beard look like never before! We offer free drinks and ..."
            link="excalibur"
            rating={5}
          />
          <ServiceCard
            image="https://frisorbarbershop.com/images/b-promo/world/1promo.jpg"
            title="Excalibur barbershop"
            about="We have only professional certified barbers that will make your hair or beard look like never before! We offer free drinks and ..."
            link="excalibur"
            rating={5}
          />
        </div>
      </Container>
    </>
  );
};
