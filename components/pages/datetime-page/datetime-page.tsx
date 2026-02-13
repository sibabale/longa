import { DateTimePick } from "@/components/organisms";
import { usePageTracking } from "@/hooks/use-page-tracking";

export type DateTimePageProps = {
  destinationName?: string;
  pickupLocation?: string;
};

export function DateTimePage({
  destinationName,
  pickupLocation,
}: DateTimePageProps = {}) {
  usePageTracking("DateTime");

  const title = destinationName
    ? `When do you want to leave for ${destinationName}?`
    : "When do you want to leave?";

  return (
    <DateTimePick
      testID="datetime-page"
      screenName="datetime"
      title={title}
      subtitle={pickupLocation ? `From ${pickupLocation}` : undefined}
      primaryActionLabel="Confirm"
      primaryActionHref="/(flow)/select-ride"
      primaryActionGetParams={(selectedDate) => {
        const params: Record<string, string> = {
          selectedDateTime: selectedDate.toISOString(),
        };
        if (pickupLocation) params.pickupLocation = pickupLocation;
        if (destinationName) params.destinationName = destinationName;
        return params;
      }}
      defaultDate={new Date()}
    />
  );
}
