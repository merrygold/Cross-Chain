
import { Heading, Stack, Text } from '@chakra-ui/react'
import { Avatar, Table, Tag } from '@web3uikit/core'
import { BlockNumber } from '@web3uikit/web3'
import React, { useEffect, useState } from 'react'

export default function Contributors() {
 

 
  return (

  <Stack direction={"row"} align={"center"} justify={"center"}>
  <Stack m={4}>
    <Table key={1} columnsConfig="100px 1fr 1fr 2fr 100px"
      customNoDataText=""
      data={[ 
        [<Avatar isRounded size={36} theme="image"/>,
      '0xeA8c142e3396b532E3af0359E955c1D97ECd234d',
      <Tag color="blue" text="fund"/>,
      'Details  oniasd as isdnoa asdkidsa ',
      <Text>200$</Text>],
      [<Avatar isRounded size={36} theme="image"/>,
      '0xeA8c142e3396b532E3af0359E955c1D97ECd234d',
      <Tag color="blue" text="fund"/>,
      'Details  oniasd as isdnoa asdkidsa ',
      <Text>200$</Text>],[<Avatar isRounded size={36} theme="image"/>,
      '0xeA8c142e3396b532E3af0359E955c1D97ECd234d',
      <Tag color="red" text="No Gas"/>,
      'Details  oniasd as isdnoa asdkidsa ',
      <Text>200$</Text>],
      [<Avatar isRounded size={36} theme="image"/>,
      '0xeA8c142e3396b532E3af0359E955c1D97ECd234d',
      <Tag color="red" text="failed"/>,
      'Details  oniasd as isdnoa asdkidsa ',
      <Text>200$</Text>],
      [<Avatar isRounded size={36} theme="image"/>,
      '0xeA8c142e3396b532E3af0359E955c1D97ECd234d',
      <Tag color="green" text="NftClaim"/>,
      'Details  oniasd as isdnoa asdkidsa ',
      <Text>200$</Text>]
    ]  
      }
      header={[
        '',
        <span>Address</span>,
        <span>Type</span>,
        <span>Details</span>,
        <span>Amount</span>,
        ''
      ]}
      isColumnSortable={[
        false,
        true,
        false,
        false
      ]}
      maxPages={4}
      onPageNumberChanged={function noRefCheck(){}}
      onRowClick={function noRefCheck(){}}
      pageSize={5}
      tableBackgroundColor="#ffffff"
    />
  </Stack>

  <Stack m={4}>
    <Table columnsConfig="100px 1fr 1fr 2fr 100px"
      customNoDataText=""
      data={[ 
        [<Avatar isRounded size={36} theme="image"/>,
      '0xeA8c142e3396b532E3af0359E955c1D97ECd234d',
      <Tag color="blue" text="fund"/>,
      'Details  oniasd as isdnoa asdkidsa ',
      <Text>200$</Text>],
      [<Avatar isRounded size={36} theme="image"/>,
      '0xeA8c142e3396b532E3af0359E955c1D97ECd234d',
      <Tag color="blue" text="fund"/>,
      'Details  oniasd as isdnoa asdkidsa ',
      <Text>200$</Text>],[<Avatar isRounded size={36} theme="image"/>,
      '0xeA8c142e3396b532E3af0359E955c1D97ECd234d',
      <Tag color="red" text="failed"/>,
      'Details  oniasd as isdnoa asdkidsa ',
      <Text>200$</Text>],
      [<Avatar isRounded size={36} theme="image"/>,
      '0xeA8c142e3396b532E3af0359E955c1D97ECd234d',
      <Tag color="green" text="NftClaim"/>,
      'Details  oniasd as isdnoa asdkidsa ',
      <Text>200$</Text>],
      [<Avatar isRounded size={36} theme="image"/>,
      '0xeA8c142e3396b532E3af0359E955c1D97ECd234d',
      <Tag color="green" text="NftClaim"/>,,
      'Details  oniasd as isdnoa asdkidsa ',
      <Text>200$</Text>]
    ]  
      }
      header={[
        '',
        <span>Address</span>,
        <span>Type</span>,
        <span>Details</span>,
        <span>Amount</span>,
        ''
      ]}
      isColumnSortable={[
        false,
        true,
        false,
        false
      ]}
      maxPages={4}
      onPageNumberChanged={function noRefCheck(){}}
      onRowClick={function noRefCheck(){}}
      pageSize={5}
      tableBackgroundColor="#ffffff"
    />
  </Stack>
  </Stack>
  

  )
}










