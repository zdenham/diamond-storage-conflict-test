# Diamond Storage Conflict Test

Idea behind this was to run a really simple simulation to see how likely storage conflicts were to arise from diamond storage

It works by generating 1M bytes32 hashes from running `keccak256` on random 100 character strings. Then finding the "minimum difference" between the closest two storage addresses in bits.

## Conclusion

`bytes32` storage space is HUGE!
