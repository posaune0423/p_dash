import styles from './SimpleColorPicker.module.css';

const colors = [
    // "#FF7F00",
    // "#FFFF00",
    "#00FF00",
    "#FF0000",
    "#000000", 
];

export interface ColorPickerProps {
    onColorSelect: (color: string) => void;
    color: string;
}

const SimpleColorPicker: React.FC<ColorPickerProps> = ({onColorSelect, color: selectedColor}) => {
    selectedColor = `#${selectedColor}`

    return (
        <div className={styles.inner}>
          {colors.map((color, index) => (
            <button
              key={index}
              style={{ backgroundColor: color }}
              className={`${styles.button} ${color === '#FFFFFF' ? styles['button-white'] : ''} ${color === selectedColor ? styles.selected : ''}`}
              aria-label={`Color ${color}`}
              onClick={() => onColorSelect(color)}
            >
              <span className={styles.label}>
                {index === 0 ? 'Blcok' : index === 1 ? 'Spike' : 'Hole'}
              </span>
            </button>
          ))}
        </div>
      );
};

export default SimpleColorPicker;
