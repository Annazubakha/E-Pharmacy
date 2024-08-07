interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className }): JSX.Element => {
  return (
    <div className={`gap-[12px] ${className}`}>
      <img src="" alt="" />
      <p className="text-[16px] tracking-[-0.03em] font-semibold">E-Pharmacy</p>
    </div>
  );
};
