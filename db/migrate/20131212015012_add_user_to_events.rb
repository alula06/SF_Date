class AddUserToEvents < ActiveRecord::Migration
  def change
    add_column :events, :user, :string
  end
end
