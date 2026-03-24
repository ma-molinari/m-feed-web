import { toast } from "@global-components/ui/use-toast";

import { APIError } from "@entities/response";

const defaultErrorHandler = (error: APIError) => {
  if (error.response?.data?.message) {
    toast({
      variant: `destructive`,
      title: error.response.data.message,
    });
    return;
  }

  toast({
    variant: `destructive`,
    title: error?.message ?? `Something went wrong`,
  });
};

export default defaultErrorHandler;
