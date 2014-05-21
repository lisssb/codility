/*


A DNA sequence can be represented as a string consisting of the letters A, C, G and T, which correspond to the types of successive nucleotides in the sequence. Each nucleotide has an impact factor, which is an integer. Nucleotides of types A, C, G and T have impact factors of 1, 2, 3 and 4, respectively. You are going to answer several queries of the form: What is the minimal impact factor of nucleotides contained in a particular part of the given DNA sequence?

The DNA sequence is given as a non-empty string S = S[0]S[1]...S[N-1] consisting of N characters. There are M queries, which are given in non-empty arrays P and Q, each consisting of M integers. The K-th query (0 ≤ K < M) requires you to find the minimal impact factor of nucleotides contained in the DNA sequence between positions P[K] and Q[K] (inclusive).

For example, consider string S = CAGCCTA and arrays P, Q such that:

    P[0] = 2    Q[0] = 4
    P[1] = 5    Q[1] = 5
    P[2] = 0    Q[2] = 6

The answers to these M = 3 queries are as follows:

        The part of the DNA between positions 2 and 4 contains nucleotides G and C (twice), whose impact factors are 3 and 2 respectively, so the answer is 2.
        The part between positions 5 and 5 contains a single nucleotide T, whose impact factor is 4, so the answer is 4.
        The part between positions 0 and 6 (the whole string) contains all nucleotides, in particular nucleotide A whose impact factor is 1, so the answer is 1.

Write a function:

    function solution(S, P, Q); 

that, given a non-empty zero-indexed string S consisting of N characters and two non-empty zero-indexed arrays P and Q consisting of M integers, returns an array consisting of M integers specifying the consecutive answers to all queries.

The sequence should be returned as:

        a Results structure (in C), or
        a vector of integers (in C++), or
        a Results record (in Pascal), or
        an array of integers (in any other programming language).

For example, given the string S = CAGCCTA and arrays P, Q such that:

    P[0] = 2    Q[0] = 4
    P[1] = 5    Q[1] = 5
    P[2] = 0    Q[2] = 6

the function should return the values [2, 4, 1], as explained above.

Assume that:

        N is an integer within the range [1..100,000];
        M is an integer within the range [1..50,000];
        each element of array P, Q is an integer within the range [0..N − 1];
        P[K] ≤ Q[K], where 0 ≤ K < M;
        string S consists only of upper-case English letters A, C, G, T.

Complexity:

        expected worst-case time complexity is O(N+M);
        expected worst-case space complexity is O(N), beyond input storage (not counting the storage required for input arguments).

Elements of input arrays can be modified.
*/


function solution(S, P, Q) {
    var long = P.length;
    var ver = S.split('');
    var val = [];
    var result = [];
    var acc = {0:0,1:0,2:0,3:0};
    var values = {0:[],1:[],2:[],3:[]};
    values[0][0]=0;
    values[1][0]=0;
    values[2][0]=0;
    values[3][0]=0;

    for(i =0 ; i<ver.length ; i++){
        if(ver[i].match(/A/)){
            acc[0]+=1;
            val[i]=1;
        }
        else if(ver[i].match(/C/)){
            acc[1]+=1;
            val[i]=2;
        }
        else if(ver[i].match(/G/)){
            acc[2]+=1;
            val[i]=3;
        }
        else{
           acc[3]+=1;
           val[i]=4;
        }
        values[0][i+1] = acc[0];
        values[1][i+1] = acc[1];
        values[2][i+1] = acc[2];
        values[3][i+1] = acc[3];
    }
    
    for(i=0; i<long; i++){
        if(Q[i]===P[i]){
            result[i] = val[P[i]];
        }
        else if(values[0][Q[i]+1]-values[0][P[i]+1]>0 || values[0][P[i]+1]-values[0][P[i]]>0){
            result[i]=1;
        }
        else if(values[1][Q[i]+1]-values[1][P[i]+1]>0 || values[1][P[i]+1]-values[1][P[i]]>0 ){
            result[i]=2;
        }
        else if(values[2][Q[i]+1]-values[2][P[i]+1]>0 || values[2][P[i]+1]-values[2][P[i]]>0){
            result[i]=3;
        }
        else{
            result[i]=4;
        }
    }
    return result;
}



/** Correcteness

function solution(S, P, Q) {
    var long = P.length;
    var ver = S.split('');
    var values = [];
    var result = [];
    
    ver.forEach(function(value, index){
        switch(value){
            case 'A':
                values[index]=1;
                break;
            case 'C':
                values[index]=2;
                break;
            case 'G':
                values[index]=3;
                break;
            case 'T':
                values[index]=4;
                break;
        }
    });

    for(i=0;i<long; i++){
        var min = 4;
        for(j=P[i]; j<=Q[i];j++){
            if(min>values[j]){
                min = values[j];
            }
        }
        result[i]=min;
    }
    return result;
}
*/
