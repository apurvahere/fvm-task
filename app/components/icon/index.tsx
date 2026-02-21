type IconProps = {
  color?: string;
  className?: string;
};

export const Icons = {
  arrow: ({ color = '#782B81', className }: IconProps) => (
    <svg viewBox="0 0 107 80" className={className} fill="none">
      <path
        d="M66.6667 80L57.3333 70.3333L81 46.6667H0V33.3333H81L57.3333 9.66667L66.6667 0L106.667 40L66.6667 80Z"
        fill={color}
      />
    </svg>
  ),
};
