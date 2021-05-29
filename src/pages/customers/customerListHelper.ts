
export const createListData = (data: any, sortingField: boolean) => {
  data = data.filter((customer: any) => customer.firstname); // filtering currupted data
  const modifiedData = data.map((customer: any) => {
    let minBid: number = customer?.bids[0]?.amount;
    let maxBid: number = 0;
    customer.name = `${customer.firstname} ${customer.lastname}`;
    customer.bids?.forEach((bid: any) => {
      if (minBid > bid.amount) {
        minBid = bid.amount;
      }
      if (maxBid < bid.amount) {
        maxBid = bid.amount;
      }
    });
    customer.minBid = minBid;
    customer.maxBid = maxBid;
    customer.premium = customer.hasPremium ? "Yes" : "No";
    return customer;
  });
  modifiedData.sort((first: any, second: any) => {
    if (!sortingField) return first.maxBid - second.maxBid;
    else return first.minBid - second.minBid;
  });

  return modifiedData;
};
