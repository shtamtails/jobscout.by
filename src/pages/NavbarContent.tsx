import { Accordion, Autocomplete, Button, Checkbox } from "@mantine/core";
import { NavbarLink } from "components/NavbarLink";
import React from "react";

export const NavbarContent: React.FC = () => {
  const accordionStyles = {
    control: { padding: "8px" },
    icon: { display: "none !important " },
    item: { borderBottom: "none" },
    content: { paddingLeft: "0", marginLeft: "0" },
    contentInner: { paddingLeft: "8px" },
  };
  return (
    <>
      <Accordion
        multiple
        styles={{
          control: { padding: "14px" },
          content: { paddingLeft: "0px" },
          icon: { display: "none !important" },
        }}
        initialItem={0}
      >
        <Accordion.Item label="Categories" opened>
          <NavbarLink>Cars</NavbarLink>
          <Accordion styles={accordionStyles}>
            <Accordion.Item label="IT"></Accordion.Item>
          </Accordion>
          <Accordion styles={accordionStyles}>
            <Accordion.Item label="Beauty"></Accordion.Item>
          </Accordion>
          <NavbarLink>Nurse</NavbarLink>
          <Accordion styles={accordionStyles}>
            <Accordion.Item label="Education"></Accordion.Item>
          </Accordion>
          <NavbarLink>Ads/Marketing</NavbarLink>
          <NavbarLink>Building</NavbarLink>
          <NavbarLink>Tailoring</NavbarLink>
          <Accordion styles={accordionStyles}>
            <Accordion.Item label="Home renovation"></Accordion.Item>
          </Accordion>
          <Accordion styles={accordionStyles}>
            <Accordion.Item label="Pets"></Accordion.Item>
          </Accordion>
          <NavbarLink>Photo and video shooting</NavbarLink>
          <NavbarLink>Lawyer</NavbarLink>
          <NavbarLink>Other</NavbarLink>
        </Accordion.Item>

        <Accordion.Item label="Filter">
          <Autocomplete label="Country" data={[`Belarus`]} pb="md" />
          <Autocomplete label="City" data={[`Minsk`, "Zhodino", "Borisov"]} pb="md" />
          <Autocomplete label="Metro" data={[`Nemiha`, "Prospekt pobedy", "Kastrychnitskaya"]} pb="md" />
          <Checkbox label="Only verified" />

          <div className="flex jcfe">
            <Button size="xs" variant="light" mt="md">
              Apply
            </Button>
          </div>
        </Accordion.Item>
      </Accordion>
    </>
  );
};
