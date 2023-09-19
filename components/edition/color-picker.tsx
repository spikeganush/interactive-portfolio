import React from 'react';
import { IoIosRefreshCircle } from 'react-icons/io';
import { useTheme } from '@/context/theme-context';
import { usePortfolioDataContext } from '@/context/portfolio-data-context';
import { BG_COLORS } from '@/constant/general';
import useSaveDataDb from '@/hooks/useSaveDataDb';
import { useInfoBubbleContext } from '@/context/info-bubble-context';

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

  const handleBubbleInfo = () => {
    setBubbleText(`Remember to change the ${
      theme === 'dark' ? 'light' : 'dark'
    } theme
    colors`);
    setOpenBubble(true);
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value.split('#')[1];
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

    setData((prev) => ({ ...prev, [keyPrefix]: defaultColor }));
    saveDataDb();
  };

  const handleOnBlur = () => {
    setOpenBubble(false);
    removeBubbleText();
    saveDataDb();
  };

  return (
    <div className={`flex flex-col${position === 'right' ? ' items-end' : ''}`}>
      <label
        className={`font-medium ${
          position === 'right' ? 'text-right' : 'text-left'
        }`}
      >{`${positionName} background color`}</label>
      <div className="flex">
        {position === 'right' && (
          <button className="w-fit mr-3" onClick={handleColorReset}>
            <IoIosRefreshCircle size="1.5rem" />
          </button>
        )}
        <input
          title={`Change ${position} background color`}
          type="color"
          value={`#${data[keyPrefix as keyof typeof data]}`}
          onChange={handleColorChange}
          onBlur={handleOnBlur}
          onClick={handleBubbleInfo}
        />
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
