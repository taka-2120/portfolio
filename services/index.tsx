import { ServiceItem } from "@/components/service-item";
import { Heading, VStack } from "@yamada-ui/react";
import EcoNotifyIcon from "@/images/eco-notify.png";

const Services = () => {
	return (
		<VStack padding={15} maxW={1000} margin={"0 auto"} gapY={20}>
			<Heading fontSize={32}>Services</Heading>
			<ServiceItem
				iconSrc={EcoNotifyIcon.src}
				appName="Eco Notify"
				description=""
			/>
		</VStack>
	);
};

export default Services;
