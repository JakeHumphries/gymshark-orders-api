class GetPackBreakdown {
  execute({ orderQuantity }: { orderQuantity: number }) {
    console.log(orderQuantity);
  }
}

const getPackBreakdown = new GetPackBreakdown();

export { getPackBreakdown };
