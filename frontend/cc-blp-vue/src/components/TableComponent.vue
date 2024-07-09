<template>
    <div class="data-table-wrapper">
        <table>
            <thead>
                <tr>
                    <th v-for="col in columnDef" :key="col.field"> {{ col.name }} </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="row in data" :key="row.id">
                    <td v-for="(key,index) in getOrderedKeys" :key="index"> {{ row[key] }} </td>
                </tr>
                <fragment v-if="data.length == 0">
                    {{ $t('messages.noData')  }}
                </fragment>
            </tbody>
        </table>
    </div>
</template>

<script>

export default {
    props: {
        columnDef: [],
        data: []
    },
    computed:{
        getOrderedKeys(){
            return this.columnDef.map(col => col.field);
        }
    }
}
</script>

<style lang="scss" scoped>

.data-table-wrapper {
    table {
        width: 100%;
        table-layout: auto;
        border-spacing: 0;
        border-collapse: collapse;

        td,
        th {
            padding: 0 16px 0 16px;

            &:last-of-type {
                padding-right: 0;
            }
        }

        th span {
            text-align: left;
        }

        thead {
            position: -webkit-sticky;
            /* Safari */
            position: sticky;
            top: calc(var(--header-height) - 1px);
            background: var(--neutral-white);
            z-index: 3;

            tr {
                box-shadow:
                    0 1px 0 0 var(--neutral-100),
                    0 0 8px 2px var(--neutral-050);
                clip-path: inset(0 0 -20px 0);

                th {
                    height: 46px;
                    text-align: left;

                    &,
                    button {
                        color: var(--new-grey);
                        font-size: 14px;
                        line-height: 18px;
                        font-family: var(--dlcm-font-regular);
                        font-weight: normal;

                        .sort.active {
                            color: var(--accent-200);
                        }

                        span {
                            display: inline-block;
                        }

                        vertical-align: middle;

                        .icon-arrow-down {
                            margin-left: 6px;
                            margin-right: 6px;
                            transition: all 0.3s ease-out;
                        }

                        .no-sort-icon-spacer {
                            width: 28px;
                        }

                        :not(.reversed) .icon-arrow-down {
                            transform: rotate(-180deg);
                        }
                    }

                    button {
                        padding: 0;
                        cursor: pointer;
                        background: none;
                        box-shadow: none;
                        border: none;

                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                    }
                }
            }
        }

        tbody {
            tr {
                border-bottom: 1px solid var(--neutral-100);

                &:last-of-type {
                    border-bottom: none;
                }
            }

            td {
                padding: 5px 0 5px 16px;
                height: 56px;
                font-family: var(--dlcm-font-light);
                font-size: 16px;
                line-height: 22px;
                color: var(--neutral-black);

                &:last-of-type {
                    padding-right: 16px;
                }

                &.empty {
                    cursor: default;
                    text-align: center;
                    background-color: var(--neutral-050);
                    height: 56px * 3;
                }
            }
        }

        thead th.expand-all,
        tbody td.expand {
            margin: 0;
            padding: 0 !important;
            width: 0;

            &> ::v-deep(.btn) {

                &,
                &:hover {
                    border-radius: unset;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 0 16px;
                    height: 100%;
                    margin-left: 16px;

                    .icon {
                        color: var(--accent-050);
                    }
                }
            }
        }

        tbody td.expand> ::v-deep(.btn) {

            &,
            &:hover {
                border-left: 1px solid var(--neutral-200);
            }
        }

        .clickable-hint {
            margin: 0;
            padding: 0;
            width: 0;
            display: flex;
            align-items: center;
            justify-content: center;

            &> ::v-deep(.btn) {

                &,
                &:hover {
                    padding: 6px;
                    position: absolute;
                    width: 1px;
                    height: 1px;
                    margin: -1px;
                    overflow: hidden;
                    clip: rect(0, 0, 0, 0);
                    border: 0;

                    &:active,
                    &:focus {
                        background-color: #fff;
                        width: auto;
                        height: auto;
                        margin: 0;
                        overflow: visible;
                        clip: auto;
                    }
                }
            }
        }
    }
}
</style>