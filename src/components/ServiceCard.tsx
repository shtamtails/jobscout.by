import {
  Badge,
  Button,
  Card,
  Group,
  Image,
  Text,
  ColorScheme,
  useMantineTheme,
} from "@mantine/core";
import React, { ReactElement } from "react";
import { Star, Icon as TablerIcon, Icon } from "tabler-icons-react";

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
  const theme = useMantineTheme();
  const starsRating: ReactElement[] = [];
  for (let i = 0; i < rating; i++) {
    starsRating.push(
      <Star key={i} size={12} fill={theme.colorScheme === "dark" ? "#ffffff" : "#e64980"} />
    );
  }
  for (let z = rating; z < 5; z++) {
    starsRating.push(<Star key={z} size={12} />);
  }

  return (
    <Card
      shadow="sm"
      p="lg"
      my="xl"
      style={{
        marginBottom: "0px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Card.Section>
        <Image src={image} height={225} />
      </Card.Section>
      <div className="flex jcsb m-t-sm">
        <Text weight={500}>{title}</Text>
        <div style={{ marginTop: "2px" }}>
          <Badge color="pink" variant="light">
            <div className="flex">{starsRating.map((el) => el)}</div>
          </Badge>
        </div>
      </div>

      <Text size="sm" py="sm">
        {about}
      </Text>
      <div className="flex aife jcfe h100">
        <Button variant="light" color="blue" fullWidth style={{}}>
          View more
        </Button>
      </div>
    </Card>
  );
};
