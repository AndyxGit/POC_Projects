import React from "react";
import { fomatStrCase, formatDate } from "utils/formatters";
import { formatLineStates } from "./formatLineStates";

const expectedComponentTooltip = (
  <>
    <div style={{ display: "flex" }}>
      Estado en la base de datos:
      <p
        style={{ marginLeft: 4, marginTop: 0, marginBottom: 0 }}
        className="color-green-base"
      >
        Activo
      </p>
    </div>
    <div style={{ display: "flex" }}>
      Estado en la plataforma:
      <p style={{ marginLeft: 4, marginTop: 0, marginBottom: 0 }} className="">
        Suspendido
      </p>
    </div>
  </>
);

const condition = {
  currentStatus: {
    id: "IN",
    description: "inconsistente",
  },
  pcePcsActual: {
    id: "AC",
    description: "activo",
  },
  accountStatus: {
    id: "1",
    description: "suspendido",
  },
  lastStatus: {
    id: "SU",
    description: "suspendido",
  },
  change: "2021-02-25 00:30:00.00 -0300",
  serviceStatus: {
    description: "suspendido manual",
    firstWordDescription: "suspendido",
  },

  someOtherKey: "someOtherValue",
};

jest.mock("../../../utils/formatters", () => ({
  fomatStrCase: jest.fn(),
  formatDate: jest.fn(),
}));

describe("FormatLineState", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should format line states correctly", () => {
    fomatStrCase.mockReturnValueOnce("Inconsistente");
    fomatStrCase.mockReturnValueOnce("Activo");
    fomatStrCase.mockReturnValueOnce("Suspendido");
    fomatStrCase.mockReturnValueOnce("Suspendido");
    fomatStrCase.mockReturnValueOnce("Suspendido");
    fomatStrCase.mockReturnValueOnce("Suspendido manual");

    formatDate.mockReturnValueOnce("25/02/2021");

    const result = formatLineStates({ condition: condition });

    expect(result).toEqual([
      {
        title: "Actual",
        description: "Inconsistente",
        id: "IN",
        tooltipDescription: expectedComponentTooltip,
      },
      {
        title: "Anterior",
        description: "Suspendido",
      },
      {
        title: "Cambio de estado",
        description: "25/02/2021",
      },
      {
        title: "Del servicio",
        description: "Suspendido",
        tooltipDescription: "Suspendido manual",
      },
    ]);
  });

  it("It should show the Status in the database without any color since the status is different from active", () => {
    const expectedComponentTooltip = (
      <>
        <div style={{ display: "flex" }}>
          Estado en la base de datos:
          <p
            style={{ marginLeft: 4, marginTop: 0, marginBottom: 0 }}
            className=""
          >
            Cancelada
          </p>
        </div>
        <div style={{ display: "flex" }}>
          Estado en la plataforma:
          <p
            style={{ marginLeft: 4, marginTop: 0, marginBottom: 0 }}
            className=""
          >
            Suspendido
          </p>
        </div>
      </>
    );

    const condition = {
      currentStatus: {
        id: "IN",
        description: "inconsistente",
      },
      pcePcsActual: {
        id: "AC",
        description: "cancelada",
      },
      accountStatus: {
        id: "1",
        description: "suspendido",
      },
    };

    fomatStrCase.mockReturnValueOnce("Inconsistente");
    fomatStrCase.mockReturnValueOnce("Cancelada");
    fomatStrCase.mockReturnValueOnce("Suspendido");

    const result = formatLineStates({ condition });

    expect(result[0].tooltipDescription).toEqual(expectedComponentTooltip);
  });

  it("It should show the status of the platform in green since it is active", () => {
    const expectedComponentTooltip = (
      <>
        <div style={{ display: "flex" }}>
          Estado en la base de datos:
          <p
            style={{ marginLeft: 4, marginTop: 0, marginBottom: 0 }}
            className=""
          >
            Cancelada
          </p>
        </div>
        <div style={{ display: "flex" }}>
          Estado en la plataforma:
          <p
            style={{ marginLeft: 4, marginTop: 0, marginBottom: 0 }}
            className="color-green-base"
          >
            Activo
          </p>
        </div>
      </>
    );

    const condition = {
      currentStatus: {
        id: "IN",
        description: "inconsistente",
      },
      pcePcsActual: {
        id: "AC",
        description: "cancelada",
      },
      accountStatus: {
        id: "1",
        description: "Activo",
      },
    };

    fomatStrCase.mockReturnValueOnce("Inconsistente");
    fomatStrCase.mockReturnValueOnce("Cancelada");
    fomatStrCase.mockReturnValueOnce("Activo");

    const result = formatLineStates({ condition: condition });

    expect(result[0].tooltipDescription).toEqual(expectedComponentTooltip);
  });

  it("  It should not show the service status tooltip since it is not suspended", () => {
    const condition = {
      serviceStatus: {
        title: "Del servicio",
        firstWordDescription: "activo",
      },
    };

    const expected = {
      title: "Del servicio",
      description: "Activo",
    };

    fomatStrCase.mockReturnValueOnce("Activo");

    const result = formatLineStates({ condition });

    expect(result[0]).toEqual(expected);
  });

  it("  It should not show the service database status tooltip since it is not suspended", () => {
    const condition = {
      currentStatus: {
        id: "AC",
        description: "activo",
      },
    };

    const expected = {
      title: "Actual",
      description: "Activo",
      id: "AC",
    };

    fomatStrCase.mockReturnValueOnce("Activo");

    const result = formatLineStates({ condition });

    expect(result[0]).toEqual(expected);
  });
});
