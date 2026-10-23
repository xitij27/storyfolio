export const cutoverStages = [
 {name:"Replicate",detail:"The new Postgres 15 cluster follows Postgres 11 through logical replication."},
 {name:"Dual write",detail:"The order service writes to both databases through ferry."},
 {name:"Compare",detail:"An hourly checksum job compares the two databases for three weeks."},
 {name:"Move reads",detail:"Reads move to the new cluster before writes."},
 {name:"Move writes",detail:"Writes move to the new cluster. The old cluster stays warm for a month as the way back."},
] as const;
