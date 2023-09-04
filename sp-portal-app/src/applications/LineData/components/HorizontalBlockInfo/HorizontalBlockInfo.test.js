import { fireEvent, render, screen, within } from "@testing-library/react";
import HorizontalBlockInfo from ".";

const component = (
  <div>
    <div>
      Estado en la base de datos:
      <p className={"color-green-base"}>Activo</p>
    </div>
    <div>
      Estado en la plataforma:
      <p>Suspendido</p>
    </div>
  </div>
);

describe("HorizontalBlockInfo", () => {
  const lineState = [
    {
      title: "Actual",
      description: "Inconsistente",
      id: "IN",
      tooltipDescription: component,
    },
    {
      title: "Anterior",
      description: "Suspendido",
    },
    {
      title: "Del servicio",
      description: "Suspendido",
      tooltipDescription: "Suspendido manual",
    },
  ];

  it("It should show the current, previous and service titles", () => {
    render(<HorizontalBlockInfo items={lineState} />);
 
    const currentTitle = screen.getByText(/Actual/i);
    const previous = screen.getByText(/Anterior/i);
    const fromService = screen.getByText(/Del servicio/i);

    expect(currentTitle).toBeInTheDocument();
    expect(previous).toBeInTheDocument();
    expect(fromService).toBeInTheDocument();
  });

  
  it("it should show the current status in inconsistent", () => {
    render(<HorizontalBlockInfo items={lineState} />);
    const description = screen.getByText(/Inconsistente/i);

    expect(description).toBeInTheDocument();
  });

  it("should show the previous status in suspended", () => {
    render(<HorizontalBlockInfo items={lineState} />);
    const previous = screen.getByText(/Anterior/i);

    const suspended = previous.nextElementSibling; 
    const value = suspended.textContent;

    expect(value).toMatch(/Suspendido/i); 
  });

  it("It should show the status of the service in suspended", () => {
    render(<HorizontalBlockInfo items={lineState} />);
    const fromService = screen.getByText(/Del servicio/i);

    const suspended = fromService.nextElementSibling; 
    const value = suspended.textContent;

    expect(value).toMatch(/Suspendido/i); 
  });

  it('should render null when items are not provided', () => {
    const { container } = render(<HorizontalBlockInfo />);
    expect(container.firstChild).toBeNull();
  });


  it('should show current status Active in current, service and previous status', () => {
    const lineStateActive = [
      {
        title: "Actual",
        description: "Activo",
        id: "AC",
      },
      {
        title: "Anterior",
        description: "Activo",
      },
      {
        title: "Del servicio",
        description: "Activo",
      },
    ]
    render(<HorizontalBlockInfo items={lineStateActive} />);

    const previousStatus = screen.getByText(/Anterior/i);
    const currentStatus = screen.getByText(/Actual/i);
    const serviceStatus = screen.getByText(/Del servicio/i);

    const activePreviousStatus = previousStatus.nextElementSibling; 
    const valuePreviousStatus = activePreviousStatus.textContent;

    const activeCurrentStatus = currentStatus.nextElementSibling; 
    const valueCurrentStatus = activeCurrentStatus.textContent;

    const activeServiceStatus = serviceStatus.nextElementSibling; 
    const valueServiceStatus = activeServiceStatus.textContent;
  
    expect(valuePreviousStatus).toMatch(/Activo/i); 
    expect(valueCurrentStatus).toMatch(/Activo/i);
    expect(valueServiceStatus).toMatch(/Activo/i);
  });


  it('hovering over the info icon should show the tooltip when the status is inconsistent', async() => {
    render(<HorizontalBlockInfo items={lineState} />);

    const iconInfo = screen.getByTestId('icon-info-Actual')
    fireEvent.mouseOver(iconInfo);
 
    const baseState = await screen.findByText(/Estado en la base de datos:/i);
    const statusPlataform = await screen.findByText(/Estado en la plataforma:/i);

    expect(baseState).toBeInTheDocument();
    expect(statusPlataform).toBeInTheDocument();

  });


  it('hovering over the info icon should show the tooltip when the state is suspended', async() => {

    render(<HorizontalBlockInfo items={lineState} />);

    const iconInfo = screen.getByTestId('icon-info-Del servicio')
    fireEvent.mouseOver(iconInfo);
 
    const fromService = await screen.findByText(/Suspendido manual/i);

    expect(fromService).toBeInTheDocument();
   
  });

  it('hovering over the info icon should show the tooltip when the status is inconsistent the status of the base is up and the platform is suspended', async() => {
    render(<HorizontalBlockInfo items={lineState} />);

    const iconInfo = screen.getByTestId('icon-info-Actual');

    fireEvent.mouseOver(iconInfo);
 
    const baseState = await screen.findByText(/Estado en la base de datos:/i);
    const statusPlataform = await screen.findByText(/Estado en la plataforma:/i);

    const statusActiveDatabase = within(baseState).getByText(/Activo/i);
    const statusSuspendedPlataform = within(statusPlataform).getByText(/Suspendido/i);

    expect(baseState).toBeInTheDocument();
    expect(statusPlataform).toBeInTheDocument();
    expect(statusActiveDatabase).toBeInTheDocument();
    expect(statusSuspendedPlataform).toBeInTheDocument();
  });

});



