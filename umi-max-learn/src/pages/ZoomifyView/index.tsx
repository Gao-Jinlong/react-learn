import { Feature, Map, View } from 'ol';
import { GeoJSON } from 'ol/format';
import { Point, Polygon } from 'ol/geom';
import Draw, { createBox, createRegularPolygon } from 'ol/interaction/Draw';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource, Zoomify } from 'ol/source';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import { useEffect, useRef, useState } from 'react';

const imgWidth = 4000;
const imgHeight = 3000;

const zoomifyUrl = 'https://ol-zoomify.surge.sh/zoomify/';

const retinaPixelRatio = 2;

const retinaSource = new Zoomify({
  url: zoomifyUrl,
  size: [imgWidth, imgHeight],
  crossOrigin: 'anonymous',
  zDirection: -1, // Ensure we get a tile with the screen resolution or higher
  tilePixelRatio: retinaPixelRatio, // Display retina tiles
  tileSize: 256 / retinaPixelRatio, // from a higher zoom level
});

const ZoomifyView = () => {
  const target = useRef<HTMLDivElement>(null);

  const [map, setMap] = useState<Map | null>(null);
  const [layer, setLayer] = useState<VectorLayer | null>(null);

  const [typeSelect, setTypeSelect] = useState<
    'None' | 'Square' | 'Box' | 'Star' | 'Circle'
  >('Box');

  useEffect(() => {
    const source = new Zoomify({
      url: zoomifyUrl,
      // projection: cartesianProjection,
      size: [imgWidth, imgHeight],
      crossOrigin: 'anonymous',
      zDirection: -1, // Ensure we get a tile with the screen resolution or higher
    });

    const extent = source.getTileGrid()!.getExtent();
    const layer = new TileLayer({
      source: source,
    });

    const featureLayer = new VectorLayer({
      source: new VectorSource({
        features: [
          new Feature({
            geometry: new Point([4000, -3000]),
          }),
        ],
      }),
      style: new Style({
        image: new CircleStyle({
          radius: 10,
          fill: new Fill({ color: 'red' }),
        }),
        fill: new Fill({ color: 'rgba(120, 220, 180, 0.5)' }),
      }),
    });
    setLayer(featureLayer);

    const map = new Map({
      layers: [layer, featureLayer],
      target: target.current!,
      view: new View({
        // adjust zoom levels to those provided by the source
        resolutions: layer.getSource()!.getTileGrid()!.getResolutions(),
        // constrain the center: center cannot be set outside this extent
        extent: extent,
        constrainOnlyCenter: true,
        // projection: cartesianProjection,
        center: [0, 0],
        zoom: 8,
      }),
    });
    map.getView().fit(extent);

    setMap(map);

    map.on('click', (event) => {
      console.log('🚀 ~ event:', event);
    });

    return () => {
      map.dispose();
    };
  }, [target]);

  useEffect(() => {
    if (!map || !layer) return;

    const drawLayer = new VectorLayer({
      source: new VectorSource({}),
    });

    let draw: Draw | null = null;

    function addInteraction() {
      if (!map) return;
      let value = typeSelect;
      if (value !== 'None') {
        let geometryFunction;
        if (value === 'Square') {
          value = 'Circle';
          geometryFunction = createRegularPolygon(4);
        } else if (value === 'Box') {
          value = 'Circle';
          geometryFunction = createBox();
        } else if (value === 'Star') {
          value = 'Circle';
          geometryFunction = function (coordinates, geometry) {
            const center = coordinates[0];
            const last = coordinates[coordinates.length - 1];
            const dx = center[0] - last[0];
            const dy = center[1] - last[1];
            const radius = Math.sqrt(dx * dx + dy * dy);
            const rotation = Math.atan2(dy, dx);
            const newCoordinates = [];
            const numPoints = 12;
            for (let i = 0; i < numPoints; ++i) {
              const angle = rotation + (i * 2 * Math.PI) / numPoints;
              const fraction = i % 2 === 0 ? 1 : 0.5;
              const offsetX = radius * fraction * Math.cos(angle);
              const offsetY = radius * fraction * Math.sin(angle);
              newCoordinates.push([center[0] + offsetX, center[1] + offsetY]);
            }
            newCoordinates.push(newCoordinates[0].slice());
            if (!geometry) {
              geometry = new Polygon([newCoordinates]);
            } else {
              geometry.setCoordinates([newCoordinates]);
            }
            return geometry;
          };
        }
        draw = new Draw({
          source: drawLayer.getSource()!,
          type: value,
          geometryFunction: geometryFunction,
          style: new Style({
            image: new CircleStyle({
              radius: 10,
              fill: new Fill({ color: 'rgba(255, 0, 0, 0.5)' }),
            }),
            fill: new Fill({ color: 'rgba(255, 220, 130, 0.5)' }),
            stroke: new Stroke({
              color: 'rgba(255, 220, 130, 0.5)',
              width: 2,
            }),
          }),
        });

        map.addInteraction(draw);

        draw.on('drawend', (event) => {
          const source = layer!.getSource()!;

          source.clear();

          source.addFeature(event.feature);

          const geoJson = new GeoJSON({}).writeFeature(event.feature);
          console.log('🚀 ~ draw.on ~ geoJson:', geoJson);
        });
      }
    }
    addInteraction();

    return () => {
      if (draw) {
        map.removeInteraction(draw);
        draw.dispose();
        map.removeLayer(drawLayer);
        drawLayer.dispose();
      }
    };
  }, [map, typeSelect]);

  return (
    <>
      <div ref={target} className="h-900px"></div>
      <div className="flex gap-2 w-full">
        <select
          className="form-select"
          id="type"
          onChange={(e) => setTypeSelect(e.target.value as any)}
        >
          <option value="Circle">Circle</option>
          <option value="Square">Square</option>
          <option value="Box">Box</option>
          <option value="Star">Star</option>
          <option value="None">None</option>
        </select>
      </div>
    </>
  );
};

export default ZoomifyView;
