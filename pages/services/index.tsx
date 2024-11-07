import { ServiceItem } from "@/components/service-item";
import { Heading, VStack } from "@yamada-ui/react";
import { services } from "@/constants/services";

const Services = () => {
	return (
		<VStack padding={15} maxW={1000} margin={"0 auto"} gapY={20}>
			<Heading fontSize={32}>Services</Heading>
			{services.map((service) => (
				<ServiceItem
					key={service.appName}
					service={service}
				/>
			))}
		</VStack>
	);
};

export default Services;
