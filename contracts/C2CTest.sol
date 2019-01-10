pragma solidity ^0.4.0;

contract C2CTest{
    
    struct order{
        uint oid;
        address to;
        uint value;
        bool status;
    }
    
    mapping(address => order[]) public global_map;
    mapping(address => uint) public length;

    function order_make( address to  , uint Oid) public payable{
        address from = msg.sender;
        uint value = msg.value;
        require(from.balance >= value , "balance is not enough to make order");
        
        global_map[from].push(order({
            oid : Oid,
            to : to,
            value : value,
            status : false
        }));
        length[from] += 1;
    }
    
    function order_confirm(uint id) public payable{
        address from = msg.sender;
        
        uint index = check_in(msg.sender , id);
        require( index != uint(-1) , "this order isn‘t exist");
    
        order storage now_order = global_map[from][index];
        require(now_order.status != true , "this order has  been paid");
    
        now_order.status = true;
        now_order.to.transfer(now_order.value);
    }
    
    function check_in(address from , uint Oid) private view returns (uint){
        uint fail = uint(-1);
        if(global_map[from].length == 0)
            return fail;
        
        for(uint i = 0 ; i < global_map[from].length ; i++)
            if(global_map[from][i].oid == Oid)
                return i;
        return fail;
    }
}