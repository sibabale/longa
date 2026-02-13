import { LocationSearchLoading } from "@/components/organisms/location-search/location-search-loading";

export type SelectRideLoadingProps = {
  testID?: string;
};

export function SelectRideLoading({
  testID = "select-ride-loading",
}: SelectRideLoadingProps) {
  return <LocationSearchLoading testID={testID} />;
}
