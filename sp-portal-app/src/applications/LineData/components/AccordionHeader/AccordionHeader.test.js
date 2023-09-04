import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import AccordionHeader from ".";

describe("Accordion Header", () => {

  const handleOpenAccordionMock = jest.fn();

  it("should display the accordion header text", () => {
    const openAccordion = false;
    render(
      <AccordionHeader
        openAccordion={openAccordion}
        handleOpenAccordion={handleOpenAccordionMock}
      />
    );
    const tittle = screen.getByText(/Datos de la línea/i);
    expect(tittle).toBeInTheDocument();
  });

  it("must execute the upward rotation class when the accordion is open", () => {
    const openAccordion = true;
    render(
      <AccordionHeader
        openAccordion={openAccordion}
        handleOpenAccordion={handleOpenAccordionMock}
      />
    );
  });

  it("should call handleOpenAccordion on enter press", async () => {
  
    const { getByTestId } = render(
      <AccordionHeader handleOpenAccordion={handleOpenAccordionMock} />
    );

    const iconAccordion = getByTestId("icon-accordion");

    await waitFor(() =>
        userEvent.type(iconAccordion, '{enter}')
    );

    expect(handleOpenAccordionMock).toHaveBeenCalled();
  });

  it("should call handleOpenAccordion on enter NumpadEnter", async () => {
  
    const { getByTestId } = render(
      <AccordionHeader handleOpenAccordion={handleOpenAccordionMock} />
    );

    const iconAccordion = getByTestId("icon-accordion");

    await waitFor(() =>
      userEvent.type(iconAccordion, '{NumpadEnter}')
    );

    expect(handleOpenAccordionMock).toHaveBeenCalled();
  });

  it("should call handleOpenAccordion on enter click", async () => {
  
    const { getByTestId } = render(
      <AccordionHeader handleOpenAccordion={handleOpenAccordionMock} />
    );

    const iconAccordion = getByTestId("icon-accordion");

    userEvent.click(iconAccordion);

    expect(handleOpenAccordionMock).toHaveBeenCalled();
  });
});
