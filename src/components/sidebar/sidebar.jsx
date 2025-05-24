// src/components/Sidebar.jsx
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { useState, useEffect } from 'react';
import "./Sidebar.css";

const SortableItem = ({ id, className }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const alpha2 = id.alpha2;
  const flagUrl = alpha2 ? `https://flagcdn.com/w40/${alpha2}.png` : null;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={className}
    >
      {flagUrl ? (
        <img src={flagUrl} alt={`${id.name} flag`} className="flag-icon" />
      ) : (
        <span className="slot-number">?</span>
      )}
      <span className="slot-country">{id.name}</span>
    </div>
  );
};



const Sidebar = ({ question, countries = [], selectedCountries = [], correctOrder = null, onValidate }) => {
  const [items, setItems] = useState([]);
  const [isValidated, setIsValidated] = useState(false);

  useEffect(() => {
    if (countries.length > 0) {
      const shuffled = countries.map((c, index) => ({
        ...c, // <-- garde alpha2, code, etc.
        position: `#${index + 1}`,
      }));
      setItems(shuffled);
    }
  }, [countries]);

  const sensors = useSensors(useSensor(PointerSensor));

  const getLineClass = (item, index) => {
    if (!isValidated) return "slot";
    return item.name === correctOrder[index] ? "slot correct" : "slot incorrect";
  };

  
  const handleClick = () => {
    setIsValidated(true);
    onValidate(items.map(i => i.name));
  };


  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = items.findIndex(i => i.name === active.id.name);
      const newIndex = items.findIndex(i => i.name === over.id.name);
      setItems(arrayMove(items, oldIndex, newIndex));
    }
  };

  return (
    <div className="sidebar">
      <div>
        <h2>{question?.label || "Classe les pays"}</h2>
        <p>Classe les pays dans l’ordre du plus au moins.</p>

        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            {items.map((item, index) => (
              <SortableItem
                key={item.name}
                id={item}
                className={getLineClass(item, index)}
              />
            ))}
          </SortableContext>
        </DndContext>

        {correctOrder && (
          <div className="correction-section">
            <h4>✅ Ordre correct :</h4>
            <ol>
              {correctOrder.map((name, i) => (
                <li key={i}>{name}</li>
              ))}
            </ol>
          </div>
        )}
      </div>

      <button
        className={items.length !== 5 ? "disabled-button" : "validate-button"}
        onClick={() => handleClick()}
        disabled={items.length !== 5}
      >
        Valider
      </button>
    </div>
  );
};

export default Sidebar;
