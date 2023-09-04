import React from 'react';
import { fireEvent, render, screen, act } from '@testing-library/react';
import { Table } from './Table';
import { AppContext } from 'Context';

describe('Table component', () => {
  const data = [
    {
      id: 1,
      ratingGroupDescription: 'Rating group 1',
      volume: { value: 10 },
      cost: { value: 100 },
      cdrDate: { dateTime: '2022-01-01T00:00:00Z' },
    },
    {
      id: 2,
      ratingGroupDescription: 'Rating group 2',
      volume: { value: 20 },
      cost: { value: 200 },
      cdrDate: { dateTime: '2022-01-02T00:00:00Z' },
    },
  ];


  const bigData = [
    {
      id: 1,
      ratingGroupDescription: 'Rating group 1',
      volume: { value: 10 },
      cost: { value: 100 },
      cdrDate: { dateTime: '2022-01-01T00:00:00Z' },
    },
    {
      id: 2,
      ratingGroupDescription: 'Rating group 2',
      volume: { value: 20 },
      cost: { value: 200 },
      cdrDate: { dateTime: '2022-01-02T00:00:00Z' },
    },
    {
      id: 3,
      ratingGroupDescription: 'Rating group 1',
      volume: { value: 10 },
      cost: { value: 100 },
      cdrDate: { dateTime: '2022-01-01T00:00:00Z' },
    },
    {
      id: 4,
      ratingGroupDescription: 'Rating group 2',
      volume: { value: 20 },
      cost: { value: 200 },
      cdrDate: { dateTime: '2022-01-02T00:00:00Z' },
    },
    {
      id: 5,
      ratingGroupDescription: 'Rating group 1',
      volume: { value: 10 },
      cost: { value: 100 },
      cdrDate: { dateTime: '2022-01-01T00:00:00Z' },
    },
    {
      id: 6,
      ratingGroupDescription: 'Rating group 2',
      volume: { value: 20 },
      cost: { value: 200 },
      cdrDate: { dateTime: '2022-01-02T00:00:00Z' },
    },
    {
      id: 7,
      ratingGroupDescription: 'Rating group 1',
      volume: { value: 10 },
      cost: { value: 100 },
      cdrDate: { dateTime: '2022-01-01T00:00:00Z' },
    },
    {
      id: 8,
      ratingGroupDescription: 'Rating group 2',
      volume: { value: 20 },
      cost: { value: 200 },
      cdrDate: { dateTime: '2022-01-02T00:00:00Z' },
    },
    {
      id: 9,
      ratingGroupDescription: 'Rating group 1',
      volume: { value: 10 },
      cost: { value: 100 },
      cdrDate: { dateTime: '2022-01-01T00:00:00Z' },
    },
    {
      id: 10,
      ratingGroupDescription: 'Rating group 2',
      volume: { value: 20 },
      cost: { value: 200 },
      cdrDate: { dateTime: '2022-01-02T00:00:00Z' },
    },
    {
      id: 11,
      ratingGroupDescription: 'Rating group 1',
      volume: { value: 10 },
      cost: { value: 100 },
      cdrDate: { dateTime: '2022-01-01T00:00:00Z' },
    },
    {
      id: 12,
      ratingGroupDescription: 'Rating group 2',
      volume: { value: 20 },
      cost: { value: 200 },
      cdrDate: { dateTime: '2022-01-02T00:00:00Z' },
    },
    {
      id: 13,
      ratingGroupDescription: 'Rating group 1',
      volume: { value: 10 },
      cost: { value: 100 },
      cdrDate: { dateTime: '2022-01-01T00:00:00Z' },
    },
    {
      id: 14,
      ratingGroupDescription: 'Rating group 2',
      volume: { value: 20 },
      cost: { value: 200 },
      cdrDate: { dateTime: '2022-01-02T00:00:00Z' },
    },
    {
      id: 15,
      ratingGroupDescription: 'Rating group 2',
      volume: { value: 20 },
      cost: { value: 200 },
      cdrDate: { dateTime: '2022-01-02T00:00:00Z' },
    },
    {
      id: 16,
      ratingGroupDescription: 'Rating group 2',
      volume: { value: 20 },
      cost: { value: 200 },
      cdrDate: { dateTime: '2022-01-02T00:00:00Z' },
    },
  ];

  const totalCost = 300;
  const totalVolume = 30;
  const message = '';
  const loading = false;

  test('renders the table header', () => {
    const value = {
      phone: '1234567891',
      country: { value: 'ar' }
    }
    render(
      <AppContext.Provider value={value}>
        <Table data={data} totalCost={totalCost} totalVolume={totalVolume} message={message} loading={loading} />
      </AppContext.Provider>
    );
    const headerText = screen.getByText('Consumos');
    expect(headerText).toBeInTheDocument();
  });

  test('renders and use the pagination', () => {
    const value = {
      phone: '1234567891',
      country: { value: 'ar' }
    }
    render(
      <AppContext.Provider value={value}>
        <Table data={data} totalCost={totalCost} totalVolume={totalVolume} message={message} loading={loading} />
      </AppContext.Provider>
    );

    const paginationText = screen.getByText('Mostrar');
    expect(paginationText).toBeInTheDocument();

    const paginationSelect = screen.getByRole("combobox")
    act(() => {
      fireEvent.select(paginationSelect, {
        target: {
          value: '50',
        },
      });
      expect(paginationSelect).toHaveValue('50');
    });
  });

  test('call order by service function', () => {
    const orderKey = {
      isAscending: true
    };

    const value = {
      phone: '1234567891',
      country: { value: 'ar' }
    }
    render(
      <AppContext.Provider value={value}>
        <Table data={data} totalCost={totalCost} totalVolume={totalVolume} message={message} loading={loading} />
      </AppContext.Provider>
    );

    const serviceHeader = screen.getByTitle('servicio');
    fireEvent.click(serviceHeader);

    const sortedDataFirst = data.sort((a, b) => {
      if (a.ratingGroupDescription < b.ratingGroupDescription) {
        const order = orderKey.isAscending ? -1 : 1;
        return order;
      }
      if (a.ratingGroupDescription > b.ratingGroupDescription) {
        const order = orderKey.isAscending ? 1 : -1;
        return order;
      }
      return 0;
    })

    expect(sortedDataFirst[0].ratingGroupDescription).toBe("Rating group 1");
  });

  test('call order by volume function', () => {
    const orderKey = {
      isAscending: true
    };

    const value = {
      phone: '1234567891',
      country: { value: 'ar' }
    }
    render(
      <AppContext.Provider value={value}>
        <Table data={data} totalCost={totalCost} totalVolume={totalVolume} message={message} loading={loading} />
      </AppContext.Provider>
    );

    const serviceHeader = screen.getByTitle('trafico');
    fireEvent.click(serviceHeader);

    const sortedDataFirst = data.sort((a, b) => {
      if (a.volume.value < b.volume.value) {
        return orderKey.isAscending ? -1 : 1;
      }
      if (a.volume.value > b.volume.value) {
        return orderKey.isAscending ? 1 : -1;
      }
      return 0;
    })

    expect(sortedDataFirst[0].volume.value).toBe(10);
  });

  test('call order by cost function', () => {
    const orderKey = {
      isAscending: true
    };

    const value = {
      phone: '1234567891',
      country: { value: 'ar' }
    }
    render(
      <AppContext.Provider value={value}>
        <Table data={data} totalCost={totalCost} totalVolume={totalVolume} message={message} loading={loading} />
      </AppContext.Provider>
    );

    const serviceHeader = screen.getByTitle('precio');
    fireEvent.click(serviceHeader);

    const sortedDataFirst = data.sort((a, b) => {
      if (a.cost.value < b.cost.value) {
        return orderKey.isAscending ? -1 : 1;
      }
      if (a.cost.value > b.cost.value) {
        return orderKey.isAscending ? 1 : -1;
      }
      return 0;
    })

    expect(sortedDataFirst[0].cost.value).toBe(100);
  });

  test('call order by date function', () => {
    const orderKey = {
      isAscending: true
    };

    const value = {
      phone: '1234567891',
      country: { value: 'ar' }
    }
    render(
      <AppContext.Provider value={value}>
        <Table data={data} totalCost={totalCost} totalVolume={totalVolume} message={message} loading={loading} />
      </AppContext.Provider>
    );
    const serviceHeader = screen.getByTitle('fecha');
    fireEvent.click(serviceHeader);

    const sortedDataFirst = data.sort((a, b) => {
      if (a.cdrDate.dateTime < b.cdrDate.dateTime) {
        return orderKey.isAscending ? -1 : 1;
      }
      if (a.cdrDate.dateTime > b.cdrDate.dateTime) {
        return orderKey.isAscending ? 1 : -1;
      }
      return 0;
    })

    expect(sortedDataFirst[0].cdrDate.dateTime).toBe('2022-01-01T00:00:00Z');
  });

  it('should render a table with pagination', () => {
    const value = {
      phone: '1234567891',
      country: { value: 'ar' }
    }

    const { getByTitle } = render(
      <AppContext.Provider value={value}>
        <Table data={bigData} totalCost={0} totalVolume={0} message={{}} loading={false} />
      </AppContext.Provider>
    );

    const iconRight = getByTitle('iconRightContainer');
    expect(iconRight).toBeEnabled();

    act(() => fireEvent.click(iconRight));

    const iconLeft = getByTitle('iconLeftContainer');
    expect(iconLeft).toBeEnabled();
  });
});