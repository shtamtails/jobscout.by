import { Badge, Button, Card, Group, Image, Text } from "@mantine/core";
import React, { ReactElement } from "react";
import { Star, Icon as TablerIcon, Icon } from "tabler-icons-react";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";

interface ICard {
  image: string;
  title: string;
  rating: number;
  about: string;
  link: string;
}

export const ServiceCard: React.FC<ICard> = ({ image, title, rating, about, link }) => {
  // Transform rating-number to array of icons of stars
  // rating = 3 => 3 filled stars
  const starsRating: ReactElement[] = [];
  for (let i = 0; i < rating; i++) {
    starsRating.push(<Star key={i} size={12} fill="#ffffff" />);
  }
  for (let z = rating; z < 5; z++) {
    starsRating.push(<Star key={z} size={12} />);
  }

  return (
    <div style={{ width: 400, margin: "auto" }}>
      <Card shadow="sm" p="lg" my="xl">
        <Card.Section>
          <Image src={image} height={225} />
        </Card.Section>

        <Group position="apart" style={{ marginBottom: 5, marginTop: 10 }}>
          <Text weight={500}>{title}</Text>
          <Badge color="pink" variant="light">
            <div className="flex">{starsRating.map((el) => el)}</div>
          </Badge>
        </Group>

        <Text size="sm">
          We have only professional certified barbers that will make your hair or beard look like
          never before! We offer free drinks and ...
        </Text>

        <Button variant="light" color="blue" fullWidth style={{ marginTop: 14 }}>
          View more
        </Button>
      </Card>
    </div>
  );
};
