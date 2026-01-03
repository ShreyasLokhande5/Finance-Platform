"use client";

import { useState, useEffect } from "react";
import { BudgetProgress } from "./budget-progress";
import { DashboardOverview } from "./transaction-overview";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { sendDashboardEmail } from "@/actions/dashboard";
import useFetch from "@/hooks/use-fetch";
import { toast } from "sonner";
import { BarChart3 } from "lucide-react";

export function DashboardWrapper({
  initialBudget,
  accounts,
  transactions,
}) {
  const [selectedAccountId, setSelectedAccountId] = useState(
    accounts.find((a) => a.isDefault)?.id || accounts[0]?.id
  );

  const {
    loading: loadingEmail,
    fn: fnSendEmail,
    data: emailData,
    error: emailError,
  } = useFetch(sendDashboardEmail);

  useEffect(() => {
    if (emailData?.success) {
      toast.success("Monthly report sent to your email");
    }
  }, [emailData, loadingEmail]);

  useEffect(() => {
    if (!selectedAccountId && accounts.length > 0) {
      setSelectedAccountId(accounts.find((a) => a.isDefault)?.id || accounts[0]?.id);
    }
  }, [accounts, selectedAccountId]);

  const filteredTransactions =
    selectedAccountId === "all" || !selectedAccountId
      ? transactions
      : transactions.filter((t) => t.accountId === selectedAccountId);

  return (
    <div className="space-y-8">
      {/* Header with Account Name and Selector */}
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-6xl font-bold tracking-tight gradient-title">
          {selectedAccountId === "all"
            ? "Dashboard"
            : accounts.find((a) => a.id === selectedAccountId)?.name ||
              "Dashboard"}
        </h1>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => fnSendEmail()}
            disabled={loadingEmail}
          >
            <BarChart3 className="h-4 w-4" />
            {loadingEmail ? "Sending..." : "Send Monthly Report"}
          </Button>
          <Select
            value={selectedAccountId || "all"}
            onValueChange={setSelectedAccountId}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select account" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Accounts</SelectItem>
              {accounts.map((account) => (
                <SelectItem key={account.id} value={account.id}>
                  {account.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Monthly Budget */}
      <BudgetProgress
        initialBudget={initialBudget}
        transactions={filteredTransactions}
      />

      {/* Recent Transactions & Expense Breakdown */}
      <DashboardOverview
        accounts={accounts}
        transactions={filteredTransactions}
      />
    </div>
  );
}
