export const MainBanner: React.FC = (): JSX.Element => {
  return (
    <section className="relative bg-my-green mb-[40px]   text-white h-[728px] pt-[197px] md:pt-[186px] md:mb-[60px]  md:h-[920px] lg:mb-[64px] lg:h-[698px] lg:pt-[44px] lg:flex lg:justify-center m-auto container">
      <div className="bg-cover bg-no-repeat bg-image h-[312px] md:h-[508px] lg:w-[749px]">
        <h1 className="text-[50px] font-semibold leading-[1] pt-[19px] md:text-[74px] md:pt-[140px] md:px-[31px] main-title lg:px-[54px]">
          Your medication delivered
        </h1>
        <p className="absolute top-[386px]  right-[20px] leading-[1.33] text-[12px] w-[156px] md:leading-[1.25] md:text-[16px] md:w-[207px] md:top-[496px]  md:right-[115px]  lg:top-[356px] lg:right-[451px] ">
          Say goodbye to all your healthcare worries with us
        </p>
      </div>
    </section>
  );
};
