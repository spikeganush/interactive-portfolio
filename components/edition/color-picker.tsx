import { useState, useRef, useEffect } from 'react';
import { IoIosRefreshCircle } from 'react-icons/io';
import { useTheme } from '@/context/theme-context';
import { usePortfolioDataContext } from '@/context/portfolio-data-context';
import { BG_COLORS } from '@/constant/general';
import useSaveDataDb from '@/hooks/useSaveDataDb';
import { useInfoBubbleContext } from '@/context/info-bubble-context';
import { HexColorPicker } from 'react-colorful';

type ColorPickerProps = {
  position: 'left' | 'right';
};

const ColorPicker = ({ position }: ColorPickerProps) => {
  const { theme } = useTheme();
  const { data, setData } = usePortfolioDataContext();
  const { saveDataDb } = useSaveDataDb();
  const positionName = position.charAt(0).toUpperCase() + position.slice(1);
  const keyPrefix = `${position}${theme === 'light' ? 'Light' : 'Dark'}Bg`;
  const { setBubbleText, setOpenBubble, removeBubbleText } =
    useInfoBubbleContext();
  const [colorPickerOpen, setColorPickerOpen] = useState(false);

  const divRef = useRef<HTMLDivElement>(null);

  const handleColorChange = (e: string) => {
    const newColor = e.split('#')[1];
    setData((prev) => ({ ...prev, [keyPrefix]: newColor }));
  };

  const handleColorReset = () => {
    const defaultColor =
      position === 'left'
        ? theme === 'light'
          ? BG_COLORS.LEFT_LIGHT
          : BG_COLORS.LEFT_DARK
        : theme === 'light'
        ? BG_COLORS.RIGHT_LIGHT
        : BG_COLORS.RIGHT_DARK;

    const dataForDb = { ...data, [keyPrefix]: defaultColor };
    setData((prev) => ({ ...prev, [keyPrefix]: defaultColor }));
    saveDataDb(dataForDb);
  };

  const handleOnBlur = () => {
    setColorPickerOpen(false);
    setOpenBubble(false);
    removeBubbleText();
    setData((prevData) => {
      saveDataDb(prevData);
      return prevData;
    });
  };

  const handleDivClick = () => {
    setBubbleText(`Remember to change the ${
      theme === 'dark' ? 'light' : 'dark'
    } theme
    colors`);
    setOpenBubble(true);
    setColorPickerOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        divRef.current &&
        !divRef.current.contains(e.target as Node) &&
        colorPickerOpen
      ) {
        handleOnBlur();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [colorPickerOpen]);

  return (
    <div className={`flex flex-col${position === 'right' ? ' items-end' : ''}`}>
      <label
        className={`font-medium text-xs sm:text-base  ${
          position === 'right' ? 'text-right' : 'text-left'
        }`}
      >{`${positionName} background color`}</label>
      <div className="flex">
        {position === 'right' && (
          <button className="w-fit mr-3" onClick={handleColorReset}>
            <IoIosRefreshCircle size="1.5rem" />
          </button>
        )}
        <button
          title="Change color"
          className="w-10 h-10 rounded-full cursor-pointer border-stone-950 border-2"
          style={{
            backgroundColor: `#${data[keyPrefix as keyof typeof data]}`,
          }}
          onClick={handleDivClick}
        ></button>

        <div
          ref={divRef}
          className={`color-picker${colorPickerOpen ? ' open' : ''}`}
        >
          <HexColorPicker
            color={`#${data[keyPrefix as keyof typeof data]}`}
            onChange={handleColorChange}
          />
        </div>
        {position === 'left' && (
          <button className="w-fit ml-3" onClick={handleColorReset}>
            <IoIosRefreshCircle size="1.5rem" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ColorPicker;
