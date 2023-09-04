import React, { useState } from 'react'
import { Table } from './Table/Table';
import { Filters } from './Filters/Filters';
import './DataConsumption.css'
import { useTableData } from '../../hooks/useTableData';

export const DataConsumption = () => {
  const { data, totalCost, totalVolume, filters, onSave, message, socialNetworks, loading } = useTableData();
  const [isZoomed, setIsZoomed] = useState(false);

  window.addEventListener("resize", () => {
    var browserZoomLevel = Math.round(window.devicePixelRatio * 100);
    if(browserZoomLevel === 200){
        setIsZoomed(true)
    } else {
        setIsZoomed(false)
    }
});

  return (
        <div className={isZoomed ? 'dataConsumptioncontainer200' : 'dataConsumptioncontainer' }>
          <Filters filters={filters} socialNetworks={socialNetworks} onSave={onSave} />
          <Table data={data} totalCost={totalCost} totalVolume={totalVolume} message={message} loading={loading} />
        </div>
  );
}