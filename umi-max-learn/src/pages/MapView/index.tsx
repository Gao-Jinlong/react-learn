import { Map, View } from 'ol';
import { Tile as TileLayer } from 'ol/layer';
import { addProjection, Projection } from 'ol/proj';
import { TileDebug } from 'ol/source';
import { useEffect, useRef, useState } from 'react';

const extent = [0, 0, 1000, 1000];
// 定义笛卡尔坐标系
const cartesianProjection = new Projection({
  code: 'cartesian', // 投影的标识符
  units: 'pixels', // 单位设置为像素，适合于平面空间
  extent: extent, // 定义坐标系的范围，笛卡尔坐标从(0, 0)到(1000, 1000)
  getPointResolution: (point) => {
    console.log('🚀 ~ point:', point);
    return 1;
  },
});

// 注册自定义投影
addProjection(cartesianProjection);

const MapView = () => {
  const target = useRef<HTMLDivElement>(null);

  const [_map, setMap] = useState<Map | null>(null);

  useEffect(() => {
    const map = new Map({
      target: target.current!,
      view: new View({
        projection: cartesianProjection,
        center: [500, 500], // 笛卡尔坐标的中心
        zoom: 1, // 设置缩放级别
        maxZoom: 10,
        minZoom: 1,
        extent: extent, // 可视范围
      }),
      layers: [
        new TileLayer({}),
        new TileLayer({
          source: new TileDebug({
            projection: cartesianProjection,
          }),
        }),
      ],
    });

    setMap(map);
    return () => {
      map.dispose();
    };
  }, [target]);

  return <div ref={target} className="h-900px"></div>;
};

export default MapView;
