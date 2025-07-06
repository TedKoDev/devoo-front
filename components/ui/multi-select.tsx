"use client";

import * as React from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";

interface Option {
  value: number;
  label: string;
}

interface MultiSelectProps {
  options: Option[];
  value: number[];
  onChange: (value: number[], labels?: string[]) => void;
  placeholder?: string;
  allowCustomInput?: boolean;
}

export function MultiSelect({ options, value, onChange, placeholder = "Select...", allowCustomInput = false }: MultiSelectProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [selected, setSelected] = React.useState<Option[]>(options.filter((option) => value.includes(option.value)));
  const [customTags, setCustomTags] = React.useState<Option[]>([]);

  const handleUnselect = (option: Option) => {
    const newSelected = selected.filter((item) => item.value !== option.value);
    setSelected(newSelected);
    onChange(
      newSelected.map((item) => item.value),
      newSelected.map((item) => item.label)
    );
  };

  const handleSelect = (option: Option) => {
    if (!selected.find((item) => item.value === option.value)) {
      const newSelected = [...selected, option];
      setSelected(newSelected);
      onChange(
        newSelected.map((item) => item.value),
        newSelected.map((item) => item.label)
      );
    }
  };

  const handleCustomInput = (text: string) => {
    const trimmedText = text.trim();
    if (trimmedText && allowCustomInput) {
      // 이미 존재하는 태그인지 확인
      const existingTag = [...options, ...customTags].find((tag) => tag.label.toLowerCase() === trimmedText.toLowerCase());

      if (!existingTag) {
        // 새로운 커스텀 태그 생성
        const newCustomTag: Option = {
          value: Date.now(), // 고유한 값 생성
          label: trimmedText,
        };
        setCustomTags((prev) => [...prev, newCustomTag]);
        handleSelect(newCustomTag);
      } else if (!selected.find((item) => item.value === existingTag.value)) {
        // 기존 태그가 있지만 선택되지 않은 경우
        handleSelect(existingTag);
      }
    }
  };

  return (
    <Command className="overflow-visible bg-transparent">
      <div className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex gap-1 flex-wrap">
          {selected.map((option) => (
            <Badge key={option.value} variant="secondary">
              {option.label}
              <button
                className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleUnselect(option);
                  }
                }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onClick={() => handleUnselect(option)}
              >
                <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
              </button>
            </Badge>
          ))}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            placeholder={selected.length === 0 ? placeholder : undefined}
            className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1"
            onValueChange={(value) => {
              setInputValue(value);
              setOpen(true);
            }}
            onBlur={() => setOpen(false)}
            onKeyDown={(e) => {
              if (e.key === "," || e.key === "Enter") {
                e.preventDefault();
                const trimmedValue = inputValue.trim();
                if (trimmedValue) {
                  // 입력된 텍스트와 정확히 일치하는 옵션 찾기
                  const exactMatch = [...options, ...customTags].find((option) => option.label.toLowerCase() === trimmedValue.toLowerCase());
                  if (exactMatch) {
                    handleSelect(exactMatch);
                  } else if (allowCustomInput) {
                    // 커스텀 입력 허용 시 새로운 태그 생성
                    handleCustomInput(trimmedValue);
                  } else {
                    // 정확히 일치하지 않으면 부분 일치하는 첫 번째 옵션 찾기
                    const partialMatch = [...options, ...customTags].find((option) => option.label.toLowerCase().startsWith(trimmedValue.toLowerCase()));
                    if (partialMatch) {
                      handleSelect(partialMatch);
                    }
                  }
                  // 입력 필드 초기화
                  setInputValue("");
                }
              }
            }}
          />
        </div>
      </div>
      <div className="relative mt-2">
        {open && (
          <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
            <CommandGroup className="max-h-60 overflow-auto">
              {[...options, ...customTags]
                .filter((option) => !selected.find((selectedOption) => selectedOption.value === option.value) && option.label.toLowerCase().includes(inputValue.toLowerCase()))
                .map((option) => {
                  const isCustomTag = customTags.find((tag) => tag.value === option.value);
                  return (
                    <CommandItem
                      key={option.value}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onSelect={() => {
                        handleSelect(option);
                        setInputValue("");
                      }}
                      className={"cursor-pointer"}
                    >
                      {option.label}
                      {isCustomTag && <span className="ml-2 text-xs text-muted-foreground">(사용자 정의)</span>}
                    </CommandItem>
                  );
                })}
              {allowCustomInput && inputValue.trim() && ![...options, ...customTags].find((option) => option.label.toLowerCase() === inputValue.trim().toLowerCase()) && (
                <CommandItem
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onSelect={() => {
                    handleCustomInput(inputValue.trim());
                    setInputValue("");
                  }}
                  className={"cursor-pointer text-blue-600"}
                >
                  "{inputValue.trim()}" 추가하기
                </CommandItem>
              )}
            </CommandGroup>
          </div>
        )}
      </div>
    </Command>
  );
}
