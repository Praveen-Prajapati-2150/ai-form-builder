import React, { useState } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';

import { Button } from '../../components/ui/button';
import themes from '../../_data/Themes';
import GradientBg from '../../_data/GradientBg';
import { Checkbox } from '../../components/ui/checkbox';

const Controller = ({
  handleSelectedTheme,
  handleFormBackground,
  selectedTheme,
  formBackground,
  handleSignInEnable,
}) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="">
      <h2 className="my-1">Themes</h2>
      <Select
        onValueChange={(value) => handleSelectedTheme(value)}
        value={selectedTheme}
        className="w-full"
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={selectedTheme ? selectedTheme : 'Theme'} />
        </SelectTrigger>
        <SelectContent>
          {themes?.map((theme, index) => {
            return (
              <SelectItem key={index} value={theme.theme}>
                <div className="flex gap-3">
                  <div className="flex">
                    <div
                      className="h-5 w-5 rounded-l-lg"
                      style={{ backgroundColor: theme.primary }}
                    ></div>
                    <div
                      className="h-5 w-5"
                      style={{ backgroundColor: theme.secondary }}
                    ></div>
                    <div
                      className="h-5 w-5"
                      style={{ backgroundColor: theme.accent }}
                    ></div>
                    <div
                      className="h-5 w-5 rounded-r-lg"
                      style={{ backgroundColor: theme.neutral }}
                    ></div>
                  </div>
                  {theme.theme}
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>

      <h2 className="mt-8 my-1">Background</h2>
      <div className="grid grid-cols-3 gap-5">
        {GradientBg.map((bg, index) => {
          if (index < 6 || showMore)
            return (
              <div
                key={index}
                className="w-full h-[70px] rounded-lg
                         hover:border-black hover:border-2 cursor-pointer
                           flex items-center justify-center"
                style={{
                  background: bg.background,
                  border: formBackground === bg.background && '2px solid black',
                }}
                onClick={() => handleFormBackground(bg.background)}
              >
                {index == 0 && 'None'}
              </div>
            );
        })}
      </div>

      <Button
        onClick={() => setShowMore(!showMore)}
        variant="ghost"
        size="sm"
        className="w-full mt-2"
      >
        {!showMore ? 'Show More' : 'Show Less'}
      </Button>

      <div className="flex items-center gap-2 my-4 mt-10">
        <Checkbox onCheckedChange={(value) => handleSignInEnable(value)} />
        <h2>Enable Social Authentication before submit the Form</h2>
      </div>
    </div>
  );
};

export default Controller;
